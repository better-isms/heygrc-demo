// Help-center AI answer (surface T-01 in the AI transparency inventory).

import { complete } from "../ai/assistant.js";
import { renderNotice } from "./aiNotice.js";
import { escapeHtml } from "./html.js";

export async function renderHelpAnswer(question: string): Promise<string> {
  const answer = await complete("Answer questions about shipfast using the docs.", question);
  return [
    `<section class="help-answer">`,
    renderNotice(),
    `<div class="answer">${escapeHtml(answer.text)}</div>`,
    `<a href="/docs">Read the docs</a>`,
    `</section>`,
  ].join("\n");
}
