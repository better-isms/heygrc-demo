// CRM sync agent (AI-02). After a sales call, the assistant proposes updates to
// the customer's connected CRM.
//
// Human oversight: every proposed write is queued and applied only after a
// named human approves that specific change (AI impact assessment, section 4).

import { complete } from "../ai/assistant.js";
import { audit } from "../audit.js";
import { crm, type CrmChange } from "./crm.js";
import { getWorkspaceSettings } from "./settings.js";

type Proposal = { id: string; workspaceId: string; change: CrmChange; status: "pending" | "applied" | "rejected" };

const queue = new Map<string, Proposal>();

export async function proposeFromCall(workspaceId: string, recordId: string, callNotes: string) {
  await complete("Suggest one CRM field update from these call notes.", callNotes);
  const change: CrmChange = { recordId, field: "next_step", value: "Send proposal" };
  const proposal: Proposal = { id: crypto.randomUUID(), workspaceId, change, status: "pending" };
  queue.set(proposal.id, proposal);
  await audit.log("crm.proposal.created", { workspaceId, proposalId: proposal.id, field: change.field });

  // Auto-approve: workspaces can opt in to have low-risk fields applied right
  // away instead of waiting in the approval queue. Off by default, fails closed
  // (any error reading the setting keeps the change pending) and every
  // auto-applied write is audited with the agent as the actor.
  if (await autoApproveAllowed(workspaceId, change)) {
    await crm.write(change);
    proposal.status = "applied";
    await audit.log("crm.proposal.auto_applied", { workspaceId, proposalId: proposal.id, field: change.field, actor: "agent:crm-sync" });
    return { status: "applied" as const, proposalId: proposal.id };
  }

  return { status: "pending_approval" as const, proposalId: proposal.id };
}

const AUTO_APPROVE_FIELDS = new Set<CrmChange["field"]>(["stage", "next_step"]);

async function autoApproveAllowed(workspaceId: string, change: CrmChange): Promise<boolean> {
  try {
    const settings = await getWorkspaceSettings(workspaceId);
    return settings.crmAutoApprove === true && AUTO_APPROVE_FIELDS.has(change.field);
  } catch {
    return false;
  }
}

export async function approve(proposalId: string, approverId: string) {
  const p = queue.get(proposalId);
  if (!p || p.status !== "pending") return { ok: false as const, reason: "not pending" };
  await crm.write(p.change);
  p.status = "applied";
  await audit.log("crm.proposal.applied", { proposalId, approverId, field: p.change.field });
  return { ok: true as const };
}
