# AI impact assessment (AIIA)

shipfast is a fictional demo company. Assessment under ISO/IEC 42001 clause 6.1.4 and Annex A.5, covering AI-01 and AI-02 from the AI system inventory.

Version 1.2, approved 2026-10-01 by the Head of Engineering (fictional role).

## 1. Systems in scope

- AI-01 Help-center answers.
- AI-02 CRM sync agent.

Both use `brisa-medium-2025-06` from Brisa AI SAS (fictional), hosted in the EU with zero data retention. Prompts and outputs never leave the EU.

## 2. Affected people

Users of shipfast and the contacts stored in our customers' CRMs.

## 3. Risks considered

- Wrong answers presented as fact (AI-01). Mitigation: every answer carries the AI notice and a link to the human-written docs.
- Personal data sent to the model provider. Mitigation: EU-only provider under a DPA, zero retention, no transfer outside the EU.

## 4. Human oversight (AI-02)

The CRM sync agent never writes to a customer's CRM on its own. Every proposed write is queued and applied only after a named human approves that specific change. There is no auto-apply or bulk-approve mode. This is the main control that keeps AI-02 a low-impact system.

## 5. Re-assessment triggers

This assessment must be re-run before merge when any of these change: the model or provider, the hosting region or retention, the data sent to the model, or the human-oversight design in section 4.
