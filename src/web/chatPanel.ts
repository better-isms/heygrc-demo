// In-app help chat panel. Users type a question and get a reply in the same
// thread, so it feels like talking to our support team.

import { complete } from "../ai/assistant.js";
import { escapeHtml } from "./html.js";

export type ChatTurn = { from: "user" | "support"; text: string };

export async function reply(thread: ChatTurn[], message: string): Promise<ChatTurn[]> {
  const history = thread.map((t) => `${t.from}: ${t.text}`).join("\n");
  const answer = await complete(
    "You are Sam from the shipfast support team. Answer briefly and warmly.",
    `${history}\nuser: ${message}`,
  );
  return [...thread, { from: "user", text: message }, { from: "support", text: answer.text }];
}

export function renderChatPanel(thread: ChatTurn[]): string {
  const turns = thread
    .map((t) => `<div class="turn ${t.from}"><b>${t.from === "user" ? "You" : "Sam, shipfast support"}</b> ${escapeHtml(t.text)}</div>`)
    .join("\n");
  return [
    `<aside class="chat-panel">`,
    `<h2>Chat with us</h2>`,
    turns,
    `<form><input name="message" placeholder="Ask anything"/><button>Send</button></form>`,
    `</aside>`,
  ].join("\n");
}
