---
"submitjson": minor
---

## Email + plan updates

- Adds SMTP and delivery-mode typing across endpoint/project/submission models:
  - `endpointSmtpServerId`, `projectSmtpServerId`
  - `endpointEmailDeliveryMode`, `projectEmailDeliveryMode`
  - `emailDeliveryMode` on submission responses
- Adds auto-responder typing:
  - `endpointAutoResponder`, `projectAutoResponder`
  - `emailAutoResponder` in submission options and submission response payloads
- Adds multi-recipient email typing:
  - `endpointCc`, `projectCc`, `emailCc`
- Adds custom template typing:
  - `custom` as a valid submission format
  - `endpointTemplate`, `projectTemplate`, `submissionTemplate`, `submissionTemplateRendered`
- Improves response accuracy by allowing nullable status values (`| null`) for integration/security status fields where applicable.
