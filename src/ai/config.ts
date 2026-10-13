// LLM provider settings for the shipfast assistant (AI-01, AI-02).
//
// Governed by docs/compliance/ai-system-inventory.md, the AI impact
// assessment and processor P-03 in docs/compliance/records-of-processing.md.
export const llm = {
  provider: "lumen",
  model: "lumen-pro-4",
  baseUrl: "https://api.lumen-ai.example/v1",
  region: "us-east-1", // Lumen AI Inc. only serves this model from the US
  retention: "30d", // provider default: prompts kept 30 days for abuse monitoring
  temperature: 0.3,
  maxOutputTokens: 800,
} as const;
