// The AI-interaction notices required by docs/compliance/ai-transparency-inventory.md
// (EU AI Act Art. 50(1)). Every AI surface renders one of these.

export const AI_NOTICE = "You are reading an answer written by an AI assistant. It can be wrong.";
export const AI_NOTICE_SHORT = "Suggested by the AI assistant";

export function renderNotice(text: string = AI_NOTICE): string {
  return `<p class="ai-notice" role="note">${text}</p>`;
}
