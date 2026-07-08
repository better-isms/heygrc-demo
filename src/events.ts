// Product analytics events. Kept intentionally minimal: the type of the event,
// which user, and when. No content, no location, no personal data beyond the id.

import { db } from "./db.js";
import type { User } from "./db.js";

export type AppEvent = { type: string };

export async function track(event: AppEvent, user: User) {
  const row = { type: event.type, userId: user.id, at: Date.now() };
  await db.events.insert(row);
}
