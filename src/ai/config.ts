// LLM provider settings for the shipfast assistant (AI-01, AI-02).
//
// Governed by docs/compliance/ai-system-inventory.md, the AI impact
// assessment and processor P-03 in docs/compliance/records-of-processing.md.
export const llm = {
  provider: "brisa",
  model: "brisa-medium-2025-06",
  baseUrl: "https://api.brisa-ai.example/v1",
  region: "eu-west-3", // Paris. Prompts and outputs stay in the EU.
  retention: "zero", // provider keeps no prompts or outputs
  temperature: 0.2,
  maxOutputTokens: 800,
} as const;
