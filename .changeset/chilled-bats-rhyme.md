---
"submitjson": minor
---

Adds support for the Telegram integration.

New fields `telegramStatus` and `telegramName` were added to the submission response.

Support for new submission options `telegramNotification`, `slackNotification`, and `discordNotification` were added to the client for better control. Endpoints must be connected to the respective service for these properties to work. 
