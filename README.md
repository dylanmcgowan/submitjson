# submitjson

![npm](https://img.shields.io/npm/v/submitjson?color=%2384cc16)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/submitjson)

JavaScript client for [Submit JSON](https://www.submitjson.com) written in TypeScript. Works in modern browsers, as well as runtimes like Node.js v18+, Bun, Deno, and Edge Runtime.


## Quick start
If you haven't already, [sign up for a Submit JSON account](https://www.submitjson.com/signup).

Install the client with a package manager:

```shell
npm install submitjson # || pnpm add submitjson || yarn add submitjson
```

Import and create a new client instance

```ts
import SubmitJSON from 'submitjson'

const sj = new SubmitJSON({
  apiKey: 'sjk_xxxxxxxxxxxxxx',
  endpoint: 'XxXxXxXxX'
})

const data = await sj.submit({
  name: 'Yo Yoerson',
  message: 'Yo',
  powerLevel: 9001,
})

console.log('Submission', data)
```

## Table of Contents
- [Quick start](#quick-start)
- [Configuration](#configuration)
- [API](#api)
  - [submit()](#submit)
- [Links](#submit-json-links)
- [License](#license)

## Configuration

- **Details**
  
  Import and create a new Submit JSON client instance. We recommend including your endpoint here for easier `submit` calls down the line. Pass in default options per client to override the current endpoint settings.


- **Type**
  ```ts
  interface SubmitJSONConfig {
    apiKey: string
    endpoint?: string
    options: SubmitOptions
  }

  interface SubmitOptions {
    emailNotification?: boolean
    emailTo?: string
    emailSubject?: string
    emailReplyTo?: string
    emailBranding?: boolean
    submissionFormat?: 'pretty' | 'raw'
    submissionSound?: 'none' | 'beep' | 'blip' | 'block' | 'coin' | 'ding' | 'dink' | 'honk' | 'jump' | 'ping' | 'pong' | 'snare'
    recaptchaToken?: string
    turnstileToken?: string
    hcaptchaToken?: string
  }

  class SubmitJSON {
    constructor(config: SubmitJSONConfig)
    submit(data, options, endpoint): Promise<Submission>
  }
  ```

- **Example**
  ```ts
  // ~/submitjson.ts
  import SubmitJSON from 'submitjson'

  export const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    endpoint: 'XxXxXxXxX',
    options: { // set defaults for this client & override endpoint settings
      emailNotification: true,
      submissionFormat: 'raw',
      submissionSound: 'none',
    },
  })
  ```

## API

### submit()
- **Details**

  POST your data to an endpoint and get notified in real time.
  
  `submit()` takes three arguments:
    1. The data (must be a valid JSON object, JSON string, or FormData)
    2. Optional configuration to override the endpoint's default settings. If this argument is a `string` it is treated as the `endpoint` for submitting data
    3. An optional `endpoint`.

- **Type**

  ```ts
  function submit(
    data: Record<string, unknown> | string | FormData,
    options?: SubmitOptions,
    endpoint?: string
  ): Promise<Submission>
  ```

- **Example with all configuration options**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    endpoint: 'XxXxXxXxX',
  })

  const data = await sj.submit({
    name: 'Yo Yoerson',
    message: 'Yo',
    powerLevel: 9001,
  }, {
    emailNotification: true,
    emailTo: 'yo@yoerson.com',
    emailReplyTo: 'diff@differson.com',
    emailBranding: false,
    emailSubject: 'My custom subject line',
    submissionFormat: 'pretty',
    submissionSound: 'ping',
    recaptchaToken: 'xxxxxxxxxxx'
  }, 'YyYyYyYyY') // overrides the endpoint set in the configuration

  console.log('Submission', data)
  ```

- **Example with multiple clients**

  Initialize multiple clients for a seperation of concerns.

  ```ts
  // submitjson.ts
  import SubmitJSON from 'submitjson'

  export const contactForm = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    endpoint: 'XxXxXxXxX',
  })

  export const userSignupNotification = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    endpoint: 'ZzZzZzZzZ',
  })
  // somewhere else in your code
  const data = { name: 'Yo Yoerson', message: 'Yo' }
  await contactForm.submit(data)
  await userSignupNotification.submit(data)
  ```

## Submit JSON Links
- [🚛 submitjson.com](https://www.submitjson.com)
- [📗 Official docs](https://www.submitjson.com/docs)
- [🧪 Full examples](https://www.submitjson.com/docs/examples)
- [🟢 API documentation (OpenAPI 3.1)](https://api.submitjson.com/v1/docs)
- [🍵 Discord](https://discord.gg/CTcKzgC9hz)
- [🐢 Email us - support@submitjson.com](mailto:support@submitjson.com)

## License

MIT License © 2023 [Submit JSON](https://www.submitjson.com)