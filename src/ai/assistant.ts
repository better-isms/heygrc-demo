// Thin client for the configured LLM. No network call happens in the demo: the
// request is built exactly as it would be sent, then a canned answer returns.

import { llm } from "./config.js";

export type Completion = { text: string; model: string };

export async function complete(system: string, input: string): Promise<Completion> {
  const request = {
    url: `${llm.baseUrl}/chat/completions`,
    body: {
      model: llm.model,
      temperature: llm.temperature,
      max_tokens: llm.maxOutputTokens,
      messages: [
        { role: "system", content: system },
        { role: "user", content: input },
      ],
    },
  };
  void request;
  return { text: "(demo answer)", model: llm.model };
}
