import createClient from 'openapi-fetch'
import type { components, paths } from './v1.js'

const { POST, GET, DELETE } = createClient<paths>({
  baseUrl: 'https://api.submitjson.com/',
})

interface SubmitJSONConfig {
  apiKey: string
  secretKey?: string
  endpoint?: string
  options?: SubmitOptions
}

interface SubmitOptions {
  emailNotification?: boolean
  emailTo?: string
  emailSubject?: string
  emailReplyTo?: string
  emailBranding?: boolean
  submissionFormat?: 'raw' | 'pretty'
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

type RequestOptions = components['schemas']['SubmissionInput']['options']
type RequestBody = paths['/v1/submit/{slug}']['post']['requestBody']['content']['application/json']

export default class SubmitJSON {
  private apiKey: string
  private secretKey?: string
  private endpointSlug: string | undefined
  private options: SubmitOptions | undefined

  constructor(config: SubmitJSONConfig) {
    this.apiKey = config.apiKey
    this.secretKey = config.secretKey
    this.endpointSlug = config.endpoint
    this.options = config.options
  }

  private getHeaders() {
    return {
      'X-API-Key': this.apiKey,
      ...(this.secretKey && { 'X-Secret-Key': this.secretKey }),
    }
  }

  async submit(data: Record<string, unknown> | FormData | string, options?: SubmitOptions | string, endpoint?: string) {
    try {
      // **HANDLE DATA**
      let d: Record<string, unknown>
      if (data instanceof FormData) {
        // validate form data first, ts error otherwise
        JSON.stringify(Object.fromEntries(data))
        d = Object.fromEntries(data)
      }
      else if (typeof data === 'string') {
        // validate that string is valid json next
        const s = JSON.parse(data)

        if (typeof s !== 'object')
          throw new Error(`☠️ The string you pass in must parse into a valid JSON object e.g. { your: 'string' }`)

        d = s
      }
      else if (typeof data === 'object') {
        // finally make sure the object is valid
        JSON.stringify(data)
        d = data
      }
      else {
        throw new TypeError('☠️ The first argument must be a valid JSON object, string, or FormData')
      }
      // **HANDLE OPTIONS**
      // if second param is a string assume it is an endpoint
      if (typeof options === 'string')
        endpoint = options

      // assign the endpoint slug to the passed in endpoint first, then the config second
      const endpointSlug = endpoint || this.endpointSlug

      // if no endpoint slug throw error
      if (endpointSlug === undefined)
        throw new Error('☠️ No endpoint defined. Add one to your client configuration or to this submit call.')

      // define the body to submit in a sec
      const body: RequestBody = { data: d }

      // define an empty options variable
      let o: SubmitOptions | undefined

      // first check if there are any options defined in the config
      if (typeof this.options === 'object')
        o = this.options

      // after assign any passed in options over the config ones
      if (typeof options === 'object')
        o ? o = { ...o, ...options } : o = options

      // check to make sure the options are valid
      if (o) {
        // deletes any undefined keys
        const { emailNotification, submissionFormat, submissionSound, emailReplyTo, emailTo, emailSubject, emailBranding } = o
        const options: RequestOptions = { emailNotification, submissionFormat, submissionSound, emailReplyTo, emailTo, emailBranding, emailSubject }
        Object.keys(options).forEach(key => options && options[key as keyof SubmitOptions] === undefined && delete options[key as keyof SubmitOptions])

        if (Object.keys(options).length > 0)
          body.options = options
      }

      // make the submission
      const { data: submission, error } = await POST('/v1/submit/{slug}', {
        headers: this.getHeaders(),
        params: {
          path: { slug: endpointSlug },
        },
        body,
      })

      if (error)
        throw new Error(error.message)

      return submission
    }
    catch (error) {
      console.error(error)
    }
  }

  // ENDPOINTS
  async getEndpoints(query?: { sort?: 'name' | 'new' | 'old' | 'submissions' | 'activity' }) {
    try {
      const { data, error } = await GET('/v1/endpoints', {
        headers: this.getHeaders(),
        params: { query },
      })

      if (error)
        throw new Error(error.message)

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  async getEndpoint(slug: string) {
    try {
      const { data, error } = await GET('/v1/endpoints/{slug}', {
        headers: this.getHeaders(),
        params: {
          path: { slug },
        },
      })

      if (error)
        throw new Error(error.message)

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  async getEndpointSubmissions(slug: string, query?: SubmissionsQuery) {
    try {
      const { data, error } = await GET('/v1/endpoints/{slug}/submissions', {
        headers: this.getHeaders(),
        params: {
          path: { slug },
          query,
        },
      })

      if (error)
        throw new Error(error.message)

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  // PROJECTS
  async getProjects(query?: { sort?: 'name' | 'new' | 'old' | 'submissions' | 'activity' }) {
    try {
      const { data, error } = await GET('/v1/projects', {
        headers: this.getHeaders(),
        params: { query },
      })

      if (error)
        throw new Error(error.message)

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  async getProject(slug: string) {
    try {
      const { data, error } = await GET('/v1/projects/{slug}', {
        headers: this.getHeaders(),
        params: {
          path: { slug },
        },
      })

      if (error)
        throw new Error(error.message)

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  async getProjectEndpoints(slug: string) {
    try {
      const { data, error } = await GET('/v1/projects/{slug}/endpoints', {
        headers: this.getHeaders(),
        params: {
          path: { slug },
        },
      })

      if (error)
        throw new Error(error.message)

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  async getProjectSubmissions(slug: string, query?: SubmissionsQuery) {
    try {
      const { data, error } = await GET('/v1/projects/{slug}/submissions', {
        headers: this.getHeaders(),
        params: {
          path: { slug },
          query,
        },
      })

      if (error)
        throw new Error(error.message)

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  // SUBMISSIONS
  async getSubmissions(query?: SubmissionsQuery) {
    try {
      const { data, error } = await GET('/v1/submissions', {
        headers: this.getHeaders(),
        params: { query },
      })

      if (error)
        throw new Error(error.message)

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  async getSubmission(id: string) {
    try {
      const { data, error } = await GET('/v1/submissions/{id}', {
        headers: this.getHeaders(),
        params: {
          path: { id },
        },
      })

      if (error)
        throw new Error(error.message)

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  async deleteSubmission(id: string) {
    try {
      const { error } = await DELETE('/v1/submissions/{id}', {
        headers: this.getHeaders(),
        params: {
          path: { id },
        },
      })

      if (error)
        throw new Error(error.message)

      return { success: true }
    }
    catch (error) {
      console.error(error)
    }
  }
}
