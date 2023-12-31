/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v1/submit/{endpointSlug}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    /**
     * Submit your data to an endpoint
     * @description Submit your data bb
     */
    post: operations['submit']
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    SubmissionInput: {
      /**
       * @description The data to submit, needs to be a valid JSON object
       * @example {
       *       "name": "Yo Yoerson",
       *       "email": "yo@yoerson.com",
       *       "message": "Yo",
       *       "powerLevel": 9001
       *     }
       */
      data: {
        [key: string]: unknown
      }
      /** @description Configure submission options, overriding the endpoint's settings. */
      options?: {
        /**
         * @description Send an email notification
         * @example false
         */
        emailNotification?: boolean
        /**
         * @description The "To" recipient of the email notification
         * @example yo@yoerson.com
         */
        emailTo?: string
        /**
         * @description Set a ReplyTo for the email notification
         * @example yo@yoerson.com
         */
        emailReplyTo?: string
        /**
         * @description Change the default email notification subject. Available on paid plans.
         * @example My custom email subject
         */
        emailSubject?: string
        /**
         * @description Remove Submit JSON branding from the email notification. Available on paid plans.
         * @example true
         */
        emailBranding?: boolean
        /**
         * @description Set the format of the submission to raw JSON or pretty
         * @example raw
         * @enum {string}
         */
        submissionFormat?: 'raw' | 'pretty'
        /**
         * @description Play a sound on submitjson.com upon submission
         * @example ping
         * @enum {string}
         */
        submissionSound?: 'none' | 'beep' | 'blip' | 'block' | 'coin' | 'ding' | 'dink' | 'honk' | 'jump' | 'ping' | 'pong' | 'snare'
      }
    }
    Submission: {
      /** Format: date-time */
      createdAt?: string
      /**
       * @example {
       *       "name": "Yo Yoerson",
       *       "email": "yo@yoerson.com",
       *       "message": "Yo",
       *       "powerLevel": 9001
       *     }
       */
      data?: Record<string, never>
      /** @example true */
      emailBranding?: boolean
      /** @example false */
      emailNotification?: boolean
      /** @example yo@yoerson.com */
      emailTo?: string | null
      /** @example yo@yoerson.com */
      emailReplyTo?: string | null
      emailStatus?: string | null
      /** @example Endpoint name {xxxyyzz} */
      emailSubject?: string
      /** @example 12345 */
      endpointId?: number
      /** @example Test Contact Form */
      endpointName?: string
      /** @example XxJqpisK8 */
      endpointSlug?: string
      /** Format: date-time */
      seenAt?: string | null
      /** @enum {string} */
      submissionFormat?: 'raw' | 'pretty'
      /** @example xxxx-xxxx-xxxx-xxx */
      submissionId?: string
      /**
       * @example ping
       * @enum {string}
       */
      submissionSound?: 'none' | 'ping'
      /** @example 12345 */
      userId?: number
    }
    ErrorResponse: {
      /** @example 🙈 */
      message?: string
      /** @example 400 */
      statusCode?: unknown
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}
export type $defs = Record<string, never>
export interface operations {
  submit: {
    parameters: {
      query?: never
      header?: never
      path: {
        /** @description The slug of the endpoint */
        endpointSlug: string
      }
      cookie?: never
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['SubmissionInput']
      }
    }
    responses: {
      /** @description Returns the new submission */
      201: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['Submission']
        }
      }
      /** @description Endpoint is disabled */
      400: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Submission limit reached */
      403: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Endpoint not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Invalid request body */
      422: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
    }
  }
}
