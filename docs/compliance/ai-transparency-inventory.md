# AI transparency inventory (EU AI Act Art. 50)

shipfast is a fictional demo company. This file lists every place where a user interacts with an AI system or sees AI-generated content, and how they are told.

Last reviewed: 2026-10-01.

| ID | Surface | AI system | Notice shown | Where the notice lives |
|----|---------|-----------|--------------|------------------------|
| T-01 | Help-center AI answer (`src/web/helpAnswer.ts`) | AI-01 | "You are reading an answer written by an AI assistant. It can be wrong." | `AI_NOTICE` in `src/web/aiNotice.ts` |
| T-02 | CRM change proposals in the approval queue | AI-02 | "Suggested by the AI assistant" badge on each proposal | `AI_NOTICE_SHORT` in `src/web/aiNotice.ts` |

Rule: any new surface where users talk to or receive content from an AI system must render the AI notice from `src/web/aiNotice.ts` at the start of the interaction and be added to this table before it ships.
