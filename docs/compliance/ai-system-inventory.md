# AI system inventory

shipfast is a fictional demo company. This inventory is part of its ISO/IEC 42001 AI management system.

Owner: Head of Engineering (fictional role). Reviewed: 2026-10-01.

| ID | AI system | Purpose | Model and provider | Hosting | Data sent | Human oversight |
|----|-----------|---------|--------------------|---------|-----------|-----------------|
| AI-01 | Help-center answers (`src/ai/assistant.ts`, `src/web/helpAnswer.ts`) | Answer product questions from signed-in users | `brisa-medium-2025-06` from Brisa AI SAS (fictional) | EU, `eu-west-3` (Paris), zero data retention | Question text, workspace plan | Answers are labelled as AI-generated; no action is taken on the user's behalf |
| AI-02 | CRM sync agent (`src/agent/crmAgent.ts`) | Propose updates to the customer's connected CRM after a call | Same as AI-01 | Same as AI-01 | Call notes, CRM record fields | Every write is approved by a named human before it is applied |

## Change rule

A change of model, provider, hosting region or retention for any system above is a change to the AI system. Before it merges:

1. update this inventory,
2. re-run the AI impact assessment (`docs/compliance/ai-impact-assessment.md`),
3. update the processor list in `docs/compliance/records-of-processing.md` if the provider changes.
