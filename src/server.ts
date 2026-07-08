// Tiny fake HTTP layer. `route` just maps a name to a handler; there is no real
// server here. It wires the endpoints the demo's pull requests touch.

import { db } from "./db.js";
import { audit } from "./audit.js";
import { requireAdmin, isSignedIn, type Session } from "./auth.js";
import { track } from "./events.js";
import { decideRefund, type RefundRequest } from "./refunds.js";

type Ctx = { session: Session | null };

function deny(reason: string) {
  return { ok: false as const, reason };
}
function ok<T>(data: T) {
  return { ok: true as const, data };
}

export const routes = {
  // Destructive admin action: delete a project. Requires an admin role.
  deleteProject: async (ctx: Ctx, projectId: string) => {
    if (!isSignedIn(ctx.session)) return deny("sign in required");
    if (!requireAdmin(ctx.session)) return deny("admin only");
    await db.projects.delete(projectId);
    return ok({ deleted: projectId });
  },

  // Change a user's role. The change is recorded in the audit log.
  updateRole: async (ctx: Ctx, targetId: string, role: "member" | "admin") => {
    if (!isSignedIn(ctx.session) || !requireAdmin(ctx.session)) return deny("admin only");
    const actor = ctx.session.user.id;
    await db.users.set({ id: targetId, role });
    await audit.log("role.update", { actor, target: targetId, role });
    return ok({ target: targetId, role });
  },

  // Record a product event.
  trackEvent: async (ctx: Ctx, type: string) => {
    if (!isSignedIn(ctx.session)) return deny("sign in required");
    await track({ type }, ctx.session.user);
    return ok({ tracked: type });
  },

  // Decide a refund request.
  refund: async (ctx: Ctx, req: RefundRequest) => {
    if (!isSignedIn(ctx.session)) return deny("sign in required");
    const decision = await decideRefund(req);
    return ok(decision);
  },
};
