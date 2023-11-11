import createClient from 'openapi-fetch'
import type { components, paths } from './v1.js'

const { POST } = createClient<paths>({
  baseUrl: 'https://api.submitjson.com/',
})

interface SubmitJSONConfig {
  apiKey: string
  endpoint?: string
  options?: SubmitOptions
}

interface SubmitOptions {
  emailNotification?: boolean
  submissionFormat?: 'raw' | 'pretty'
  submissionSound?: 'none' | 'ping'
}

type RequestOptions = components['schemas']['SubmissionInput']['options']
type RequestBody = paths['/v1/endpoints/{endpointSlug}']['post']['requestBody']['content']['application/json']

export default class SubmitJSON {
  private apiKey: string
  private endpointSlug: string | undefined
  private options: SubmitOptions | undefined

  constructor(config: SubmitJSONConfig) {
    this.apiKey = config.apiKey
    this.endpointSlug = config.endpoint
    this.options = config.options
  }

  private getHeaders() {
    return {
      'X-API-Key': this.apiKey,
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
          throw new Error(`🕱 The string you pass in must parse into an object e.g. { your: 'string' }`)

        d = s
      }
      else if (typeof data === 'object') {
        // finally make sure the object is valid
        JSON.stringify(data)
        d = data
      }
      else {
        throw new TypeError('🕱 The first argument must be a valid JSON object, string, or FormData')
      }
      // **HANDLE OPTIONS**
      // if second param is a string assume it is an endpoint
      if (typeof options === 'string')
        endpoint = options

      // assign the endpoint slug to the passed in endpoint first, then the config second
      const endpointSlug = endpoint || this.endpointSlug

      // if no endpoint slug throw error
      if (endpointSlug === undefined)
        throw new Error('🕱 No endpoint defined. Add one to your client configuration or to this submit call.')

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
        const { emailNotification, submissionFormat, submissionSound } = o
        const options: RequestOptions = { emailNotification, submissionFormat, submissionSound }
        Object.keys(options).forEach(key => options && options[key as keyof SubmitOptions] === undefined && delete options[key as keyof SubmitOptions])

        if (Object.keys(options).length > 0)
          body.options = options
      }

      // make the submission
      const { data: submission, error } = await POST('/v1/endpoints/{endpointSlug}', {
        headers: this.getHeaders(),
        params: {
          path: { endpointSlug },
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
}
