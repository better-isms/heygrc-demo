// Session and authorization helpers.

import type { User } from "./db.js";

export type Session = { user: User; mfaVerified: boolean };

export function isSignedIn(session: Session | null): session is Session {
  return session != null;
}

// Authorization: is this user allowed to perform an admin action?
export function requireAdmin(session: Session): boolean {
  return session.user.role === "admin";
}
