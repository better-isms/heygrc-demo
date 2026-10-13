// Session replay to see where users drop off during onboarding. Records page
// views, clicks and form input (password fields masked) and ships them in
// batches to Replayly, so we can watch sessions in their dashboard.

import type { User } from "../db.js";

const INGEST_URL = "https://ingest.replayly.example/v2/sessions";
const PROJECT_KEY = "rpl_pub_demo_0000"; // public browser key, not a secret

type ReplayEvent = { kind: "view" | "click" | "input"; target: string; value?: string; at: number };

let buffer: ReplayEvent[] = [];
let identity: { userId: string; email: string } | null = null;

export function startReplay(user: User & { email: string }) {
  identity = { userId: user.id, email: user.email };
  buffer = [];
}

export function record(kind: ReplayEvent["kind"], target: string, value?: string) {
  const masked = target.includes("password") ? "***" : value;
  buffer.push({ kind, target, value: masked, at: Date.now() });
  if (buffer.length >= 50) void flush();
}

export async function flush() {
  if (!identity || buffer.length === 0) return;
  const payload = { projectKey: PROJECT_KEY, user: identity, events: buffer };
  buffer = [];
  await fetch(INGEST_URL, { method: "POST", body: JSON.stringify(payload) });
}
