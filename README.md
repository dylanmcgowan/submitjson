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
  - [getEndpoints()](#getendpoints)
  - [getEndpoint()](#getendpoint)
  - [getEndpointSubmissions()](#getendpointsubmissions)
  - [getProjects()](#getprojects)
  - [getProject()](#getproject)
  - [getProjectEndpoints()](#getprojectendpoints)
  - [getProjectSubmissions()](#getprojectsubmissions)
  - [getSubmissions()](#getsubmissions)
  - [getSubmission()](#getsubmission)
  - [deleteSubmission()](#deletesubmission)
- [Links](#submit-json-links)
- [License](#license)

## Configuration

- **Details**

  Import and create a new Submit JSON client instance. We recommend including your endpoint here for easier `submit` calls down the line. Pass in default options per client to override the current endpoint settings.

- **Type**

  ```ts
  interface SubmitJSONConfig {
    apiKey: string
    secretKey?: string
    endpoint?: string
    options?: SubmitOptions
  }

  interface SubmitOptions {
    emailNotification?: boolean
    emailTo?: string
    emailReplyTo?: string
    emailBranding?: boolean
    emailSubject?: string
    emailFromName?: string
    submissionFormat?: 'pretty' | 'raw'
    submissionSound?: 'none' | 'beep' | 'blip' | 'block' | 'coin' | 'ding' | 'dink' | 'honk' | 'jump' | 'ping' | 'pong' | 'snare'
    recaptchaToken?: string
    turnstileToken?: string
    hcaptchaToken?: string
    discordNotification?: boolean
    slackNotification?: boolean
    telegramNotification?: boolean
  }

  interface SubmissionsQuery {
    page?: number
    order?: 'asc' | 'desc'
    period?: 'day' | 'week' | 'month' | '3months' | '6months' | 'year' | 'all'
    search?: string
    status?: 'all' | 'new' | 'seen'
  }

  class SubmitJSON {
    constructor(config: SubmitJSONConfig)

    // Submission
    submit(data, options?, endpoint?): Promise<Submission>

    // Endpoints
    getEndpoints(query?): Promise<Endpoint[]>
    getEndpoint(slug): Promise<EndpointResponse>
    getEndpointSubmissions(slug, query?): Promise<SubmissionsResponse>

    // Projects
    getProjects(query?): Promise<Project[]>
    getProject(slug): Promise<ProjectResponse>
    getProjectEndpoints(slug): Promise<Endpoint[]>
    getProjectSubmissions(slug, query?): Promise<SubmissionsResponse>

    // Submissions
    getSubmissions(query?): Promise<SubmissionsResponse>
    getSubmission(id): Promise<Submission>
    deleteSubmission(id): Promise<{ success: boolean }>
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
    emailFromName: 'My custom from name',
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

### getEndpoints()

- **Details**

  Retrieve all endpoints for the authenticated user. Available on all paid plans.

- **Type**

  ```ts
  function getEndpoints(
    query?: { sort?: 'name' | 'new' | 'old' | 'submissions' | 'activity' }
  ): Promise<Endpoint[]>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx', // required for public API routes
  })

  // Get all endpoints sorted by name (default)
  const endpoints = await sj.getEndpoints()

  // Get endpoints sorted by most recent submissions
  const recentEndpoints = await sj.getEndpoints({ sort: 'activity' })

  console.log('Endpoints', endpoints)
  ```

### getEndpoint()

- **Details**

  Retrieve a single endpoint by its slug. Available on all paid plans.

- **Type**

  ```ts
  function getEndpoint(slug: string): Promise<EndpointResponse>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx',
  })

  const endpoint = await sj.getEndpoint('XxXxXxXxX')

  console.log('Endpoint', endpoint.endpoint)
  console.log('Webhooks', endpoint.webhooks)
  console.log('Origins', endpoint.origins)
  ```

### getEndpointSubmissions()

- **Details**

  Retrieve paginated submissions for a specific endpoint with optional filtering. Available on all paid plans.

- **Type**

  ```ts
  function getEndpointSubmissions(
    slug: string,
    query?: SubmissionsQuery
  ): Promise<{
    submissions: Submission[]
    submissionCount: number
    totalPages: number
    currentPage: number
  }>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx',
  })

  // Get first page of submissions
  const { submissions, totalPages } = await sj.getEndpointSubmissions('XxXxXxXxX')

  // Get new submissions from the last week
  const recent = await sj.getEndpointSubmissions('XxXxXxXxX', {
    period: 'week',
    status: 'new',
    order: 'desc',
  })

  // Search submissions
  const results = await sj.getEndpointSubmissions('XxXxXxXxX', {
    search: 'urgent',
  })

  console.log('Submissions', submissions)
  ```

### getProjects()

- **Details**

  Retrieve all projects for the authenticated user. Optionally sort by various criteria. Available on all paid plans.

- **Type**

  ```ts
  function getProjects(
    query?: { sort?: 'name' | 'new' | 'old' | 'submissions' | 'activity' }
  ): Promise<Project[]>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx',
  })

  // Get all projects sorted by name (default)
  const projects = await sj.getProjects()

  // Get projects sorted by submission count
  const busyProjects = await sj.getProjects({ sort: 'submissions' })

  console.log('Projects', projects)
  ```

### getProject()

- **Details**

  Retrieve a single project by its slug, including associated endpoints, integrations, and allowed origins. Available on all paid plans.

- **Type**

  ```ts
  function getProject(slug: string): Promise<ProjectResponse>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx',
  })

  const project = await sj.getProject('my-website')

  console.log('Project', project.project)
  console.log('Endpoints', project.endpoints)
  console.log('Slack Workspaces', project.slackWorkspaces)
  ```

### getProjectEndpoints()

- **Details**

  Retrieve all endpoints associated with a specific project. Available on all paid plans.

- **Type**

  ```ts
  function getProjectEndpoints(slug: string): Promise<Endpoint[]>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx',
  })

  const endpoints = await sj.getProjectEndpoints('my-website')

  console.log('Project Endpoints', endpoints)
  ```

### getProjectSubmissions()

- **Details**

  Retrieve paginated submissions for all endpoints in a specific project with optional filtering. Available on all paid plans.

- **Type**

  ```ts
  function getProjectSubmissions(
    slug: string,
    query?: SubmissionsQuery
  ): Promise<{
    submissions: Submission[]
    submissionCount: number
    totalPages: number
    currentPage: number
  }>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx',
  })

  // Get all submissions for a project
  const { submissions } = await sj.getProjectSubmissions('my-website')

  // Get unread submissions from the last month
  const recent = await sj.getProjectSubmissions('my-website', {
    period: 'month',
    status: 'new',
    page: 1,
  })

  console.log('Project Submissions', submissions)
  ```

### getSubmissions()

- **Details**

  Retrieve paginated submissions across all endpoints and projects. Optionally filter by project. Available on all paid plans.

- **Type**

  ```ts
  function getSubmissions(
    query?: SubmissionsQuery & { project?: string }
  ): Promise<{
    submissions: Submission[]
    submissionCount: number
    totalPages: number
    currentPage: number
  }>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx',
  })

  // Get all submissions
  const { submissions, totalPages } = await sj.getSubmissions()

  // Get submissions from a specific project
  const projectSubs = await sj.getSubmissions({
    project: 'my-website',
  })

  // Get new submissions from the last day
  const today = await sj.getSubmissions({
    period: 'day',
    status: 'new',
    order: 'desc',
  })

  console.log('All Submissions', submissions)
  ```

### getSubmission()

- **Details**

  Retrieve a single submission by its ID. Available on all paid plans.

- **Type**

  ```ts
  function getSubmission(id: string): Promise<Submission>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx',
  })

  const submission = await sj.getSubmission('xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')

  console.log('Submission', submission)
  console.log('Submission Data', submission.data)
  ```

### deleteSubmission()

- **Details**

  Delete a submission by its ID. This action decrements the endpoint's submission count and cannot be undone.  Available on all paid plans.

- **Type**

  ```ts
  function deleteSubmission(id: string): Promise<{ success: boolean }>
  ```

- **Example**

  ```ts
  import SubmitJSON from 'submitjson'

  const sj = new SubmitJSON({
    apiKey: 'sjk_xxxxxxxxxxxxxx',
    secretKey: 'sjsk_xxxxxxxxxxxxxx',
  })

  const result = await sj.deleteSubmission('xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  ```

## Submit JSON Links

- [🚛 submitjson.com](https://www.submitjson.com)
- [📗 Official docs](https://www.submitjson.com/docs)
- [🧪 Full examples](https://www.submitjson.com/docs/examples)
- [🟢 API documentation (OpenAPI 3.1)](https://api.submitjson.com/v1/docs)
- [🍵 Discord](https://discord.gg/CTcKzgC9hz)
- [🐢 Email us - support@submitjson.com](mailto:support@submitjson.com)

## License

MIT License © 2025 [Submit JSON](https://www.submitjson.com)
