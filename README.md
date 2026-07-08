# heygrc-demo

A tiny, deliberately synthetic web service used to show what [heygrc](https://heygrc.com) does on a pull request.

heygrc is a GitHub App that reviews each pull request for **compliance** impact: it reads the change against the frameworks your company must meet (ISO 27001, SOC 2, GDPR, and more) and comments the exact control a change touches, at the diff. It runs alongside your code reviewer and security scanner, and it never blocks a merge.

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

Each change is correct, working code. None is a bug or a vulnerability. That is the point: compliance is a third question, separate from correctness and security, and it is the one heygrc answers.

## Not a real project

Do not use this code. It is a demo. It has no license to use, no support, and no relationship to any real system or person.
