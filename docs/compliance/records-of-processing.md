# Records of processing activities (GDPR Art. 30)

shipfast is a fictional demo company acting as controller for its own users and as processor for its customers' CRM data.

Last reviewed: 2026-10-01.

## Processing activities

| ID | Activity | Data subjects | Personal data | Processors | Transfers outside the EU |
|----|----------|---------------|---------------|------------|--------------------------|
| R-01 | Account and billing | Users | Name, email, billing details | P-01, P-02 | None |
| R-02 | Product analytics (first party, `src/events.ts`) | Users | User id, event type, timestamp | P-01 | None |
| R-03 | AI help-center answers and CRM sync agent | Users, CRM contacts | Questions, call notes, CRM fields | P-01, P-03 | None |

## Processors (sub-processors)

| ID | Processor (fictional) | Service | Location | DPA (Art. 28) | Transfer safeguard |
|----|-----------------------|---------|----------|---------------|--------------------|
| P-01 | Nimbus Hosting GmbH | Hosting, database | EU (Frankfurt) | Signed | Not needed (EU) |
| P-02 | Postwerk Mail SE | Transactional email | EU (Amsterdam) | Signed | Not needed (EU) |
| P-03 | Brisa AI SAS | LLM inference for AI-01 and AI-02 | EU (Paris), zero retention | Signed | Not needed (EU) |

No other vendor receives personal data. Adding a vendor that receives personal data needs, before the code ships: a signed DPA, a transfer assessment and safeguard (SCCs or adequacy) if data leaves the EU, a row in this table, and an update to the public sub-processor list.
