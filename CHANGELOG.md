# submitjson

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
