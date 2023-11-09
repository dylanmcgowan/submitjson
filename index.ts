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
type RequestBody = paths['/v1/endpoints/{endpoint_slug}']['post']['requestBody']['content']['application/json']

export default class SubmitJSON {
  private api_key: string
  private endpoint_slug: string | undefined
  private options: SubmitOptions | undefined

  constructor(config: SubmitJSONConfig) {
    this.api_key = config.apiKey
    this.endpoint_slug = config.endpoint
    this.options = config.options
  }

  private getHeaders() {
    return {
      'X-API-Key': this.api_key,
    }
  }

  async submit(data: Record<string, unknown>, options?: SubmitOptions | string, endpoint?: string) {
    try {
      // validate that data is an object
      if (typeof data !== 'object')
        throw new Error('param "data" must be a valid JSON object')

      // make sure the object is valid JSON
      JSON.stringify(data)

      // if second param is a string assume it is an endpoint
      if (typeof options === 'string')
        endpoint = options

      // assign the endpoint slug to the passed in endpoint first, then the config second
      const endpoint_slug = endpoint || this.endpoint_slug

      // if no endpoint slug throw error
      if (endpoint_slug === undefined)
        throw new Error('👻 No endpoint defined. Add one to your client configuration or to this submit call.')

      // define the body to submit in a sec
      const body: RequestBody = { data }

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
        const requestOptions: RequestOptions = {}
        // attach known properties to requestOptions
        if (Object.prototype.hasOwnProperty.call(o, 'emailNotification'))
          requestOptions.email_notification = o.emailNotification
        if (Object.prototype.hasOwnProperty.call(o, 'submissionFormat'))
          requestOptions.submission_format = o.submissionFormat
        if (Object.prototype.hasOwnProperty.call(o, 'submissionSound'))
          requestOptions.submission_sound = o.submissionSound
        // ooh yea
        if (Object.keys(requestOptions).length > 0)
          body.options = requestOptions
      }

      // make the submission
      const { data: submission, error } = await POST('/v1/endpoints/{endpoint_slug}', {
        headers: this.getHeaders(),
        params: {
          path: { endpoint_slug },
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
