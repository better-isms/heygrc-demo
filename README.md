# heygrc-demo

[![heygrc | PR compliance review](https://heygrc.com/badge.svg)](https://heygrc.com/for/open-source)

A tiny, deliberately synthetic web service used to show what [heygrc](https://heygrc.com) does on a pull request.

heygrc is a GitHub App that reviews each pull request for **compliance** impact: it reads the change against the frameworks your company must meet (ISO 27001, SOC 2, GDPR, and more) and cites the control a change touches, at the diff. It runs alongside your code reviewer and security scanner. The check is neutral by default.

## What this repo is

`shipfast` is a made-up B2B SaaS. None of it is real: there are no users, no data, no product. It exists only so that each open pull request can carry one clean, working, secure change that still moves a compliance control, the kind of change a bug checker and a security scanner are not looking for.

Open the pull requests in this repo to see heygrc's review on each one. Every example is illustrative ("the kind of change"), not a real incident.

## The pull requests

| PR | The change | The control it touches |
|----|------------|------------------------|
| Widen an admin role | Drops a role check on a destructive endpoint | SOC 2 CC6.1 (logical access) |
| Trim a noisy audit log | Removes the log line for a privileged action | ISO 27001 A.8.15 (logging) |
| Add a location field | Starts collecting precise location per event | GDPR Art. 30 (records of processing) |
| Auto-decide refunds | Auto-rejects a refund with no human review | GDPR Art. 22 (automated decisions) |
| Log the checkout payload | Writes the full request, including PII, to logs | GDPR Art. 5(1)(c) (data minimisation) |
| Triage tickets with an external LLM | Sends ticket bodies to an LLM and logs the prompt | GDPR Art. 28 and Art. 5(1)(c) |
| Switch the assistant model | Moves the LLM to a new US provider while the AI inventory, impact assessment and processor list still name the old one | ISO 42001 (AI impact assessment), GDPR Art. 28, 30, 44-46 |
| Auto-approve agent writes | Lets the AI agent write to the CRM without per-change approval | EU AI Act Art. 14, ISO 42001 A.5 (human oversight) |
| Add session replay | Sends user sessions to a new analytics vendor | GDPR Art. 28 and Art. 30 (processors, records of processing) |
| Add a help chat panel | Shows AI replies with no AI-interaction notice | EU AI Act Art. 50(1) (transparency) |

The fictional company's own compliance records (AI system inventory, AI impact assessment, records of processing, AI transparency inventory) live in `docs/compliance/`, so a change can drift from what the company says it does.

Each change is correct, working code. None is a bug or a vulnerability. That is the point: compliance is a third question, separate from correctness and security, and it is the one heygrc answers.

## Not a real project

Do not use this code. It is a demo. It has no license to use, no support, and no relationship to any real system or person.
