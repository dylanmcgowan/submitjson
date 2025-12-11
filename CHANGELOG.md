# submitjson

## 0.13.0

### Minor Changes

- 22cb927: ## API enhancements

  This release adds comprehensive support for the Submit JSON REST API, enabling you to programmatically manage your endpoints, projects, and submissions.

  ### ✨ New Features

  **Secret Key Authentication**

  - Added optional `secretKey` configuration parameter for secure server-side API access
  - All new API methods require secret key authentication
  - Fully backwards compatible - existing `submit()` functionality unchanged

  **Endpoint Methods**

  - `getEndpoints()` - Retrieve all endpoints with optional sorting
  - `getEndpoint(slug)` - Get a single endpoint with integrations and origins
  - `getEndpointSubmissions(slug, query?)` - Fetch paginated endpoint submissions

  **Project Methods**

  - `getProjects()` - Retrieve all projects with optional sorting
  - `getProject(slug)` - Get a single project with endpoints and integrations
  - `getProjectEndpoints(slug)` - List all endpoints in a project
  - `getProjectSubmissions(slug, query?)` - Fetch paginated project submissions

  **Submission Methods**

  - `getSubmissions(query?)` - Retrieve all submissions with filtering
  - `getSubmission(id)` - Get a single submission by ID

  ### 🔧 Breaking Changes

  None - This release is fully backwards compatible.

  ### 📚 Documentation

  See the updated [README](https://github.com/submitjson/submitjson-client#readme) for complete API documentation and examples.

  **Requirements:**

  - Secret key required for all new API methods (available in your [API settings](https://www.submitjson.com/account/api-keys))
  - REST API access available on all paid plans

  ### 🔗 Related

  - [REST API Documentation](https://api.submitjson.com/v1/docs)
  - [Blog post: Secret key auth & REST API enhancements](https://www.submitjson.com/blog/api-enhancements)

## 0.12.0

### Minor Changes

- 03bb576: Add support for the Google Sheets integration.

  New fields `googleSheetsStatus`, `googleSheetsUrl`, and `uniqueKey` were added to the submission response.

## 0.11.0

### Minor Changes

- ded8d5c: Adds support for the Telegram integration.

  New fields `telegramStatus` and `telegramName` were added to the submission response.

  Support for new submission options `telegramNotification`, `slackNotification`, and `discordNotification` were added to the client for better control. Endpoints must be connected to the respective service for these properties to work.

## 0.10.0

### Minor Changes

- 017f52b: Adds support for customizing the "From" name of the notification email.

  A new property `emailFromName` was added to the submission options.

  This functionality is available on Growth and Pro plans.

## 0.9.0

### Minor Changes

- bcf5971: Adds support for Slack and Discord integrations.

  New fields `discordStatus`, `discordChannel`, `slackChannel`, and `slackStatus` were added to the submission response.

## 0.8.1

### Patch Changes

- fec3dcb: change submission response ids from type number > string

## 0.8.0

### Minor Changes

- c8ff060: 🤖 adds CAPTCHA support - reCAPTCHA, Cloudflare Turnstile, hCaptcha

## 0.7.0

### Minor Changes

- 69f04a2: Adds `webhookStatus` and `zapierStatus` to the submission response

## 0.6.0

### Minor Changes

- df5f2f8: Email notification enhancements
  - You can now customize the email notification subject line with the `emailSubject` option
  - You can now remove Submit JSON branding with the `emailBranding` option
  - `submissionRecipient` renamed to `emailTo`

## 0.5.1

### Patch Changes

- 736d776: fix emailReplyTo and submissionRecipient behavior

## 0.5.0

### Minor Changes

- 68a276c: update submit POST url from /endpoints/:endpointSlug to /submit/:endpointSlug

## 0.4.1

### Patch Changes

- 1cba9e6: Adds cors header to request + update docs

## 0.4.0

### Minor Changes

- 552100b: Adds 10 new submission sounds

## 0.3.0

### Minor Changes

- e9c8892: adds emailReplyTo to SubmitOptions
- e9c8892: adds submissionRecipient to Submit Options

## 0.2.0

### Minor Changes

- 20f3fe8: switches from snake_case to camelCase (behind the scenes)

### Patch Changes

- 20f3fe8: optimize options key validation + deletion

## 0.1.0

### Minor Changes

- 5248572: ⚡️ submitjson client stabilizes
  - Also ensure strings are a JSON object
  - More readme updates

## 0.0.2

### Patch Changes

- 10c0981: update npm access config + data type on README

## 0.0.1

### Patch Changes

- 2b472ef: Initialize the submitjson client
- 2b472ef: accept FormData and string as data argument
