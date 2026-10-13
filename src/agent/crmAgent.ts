// CRM sync agent (AI-02). After a sales call, the assistant proposes updates to
// the customer's connected CRM.
//
// Human oversight: every proposed write is queued and applied only after a
// named human approves that specific change (AI impact assessment, section 4).

import { complete } from "../ai/assistant.js";
import { audit } from "../audit.js";
import { crm, type CrmChange } from "./crm.js";

type Proposal = { id: string; workspaceId: string; change: CrmChange; status: "pending" | "applied" | "rejected" };

const queue = new Map<string, Proposal>();

export async function proposeFromCall(workspaceId: string, recordId: string, callNotes: string) {
  await complete("Suggest one CRM field update from these call notes.", callNotes);
  const change: CrmChange = { recordId, field: "next_step", value: "Send proposal" };
  const proposal: Proposal = { id: crypto.randomUUID(), workspaceId, change, status: "pending" };
  queue.set(proposal.id, proposal);
  await audit.log("crm.proposal.created", { workspaceId, proposalId: proposal.id, field: change.field });
  return { status: "pending_approval" as const, proposalId: proposal.id };
}

export async function approve(proposalId: string, approverId: string) {
  const p = queue.get(proposalId);
  if (!p || p.status !== "pending") return { ok: false as const, reason: "not pending" };
  await crm.write(p.change);
  p.status = "applied";
  await audit.log("crm.proposal.applied", { proposalId, approverId, field: p.change.field });
  return { ok: true as const };
}
