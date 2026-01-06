---
"submitjson": minor
---

Adds activity logs to single submission response (`GET /v1/submissions/{id}`).

The `findSubmission` endpoint now returns a `SubmissionWithLogs` object that includes:
- `webhookEvents`: Array of webhook delivery events
- `logs`: Array of activity logs for the submission (submission, email, Discord, Slack, Telegram, Google Sheets, Zapier, etc.)

This allows you to see the full history of what happened after a submission was received.