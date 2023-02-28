import axio from 'axios'

const STATUS_UNAUTH = 401
const STATUS_NOT_FOUND = 404

const axios = axio.create({
  baseURL: '',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
  }
})
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)
axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      if (error.response.status === STATUS_UNAUTH) {
        // unauthorizedCb()
        console.error('please login')
      } else if (error.response.status === STATUS_NOT_FOUND) {
        console.error('resource not found')
      } else if (error.response.status >= 500) {
        console.error('server error')
      }
    } else {
      console.error('network error')
    }
    return Promise.reject(error)
  }
)

interface IFetchParam {
  server?: string
  version?: string
  resource?: string
  payload?: any
  params?: any
  contentType?: string
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'
  headers?: any
  credentials?: string
  timeout?: number
}

/**
 * fetch util
 * @param {*} fetchParam
 * @returns promise
 */
// const request = (url, method, params = {}, config) => {
const request = (fetchParam: IFetchParam): Promise<any> => {
  const { resource, method = 'GET', params = {}, payload = {}, headers = {}, ...config } = fetchParam
  const reqParams: any = {
    url: resource,
    method,
    headers,
    ...config
  }
  reqParams.params = { env: 'test', ...params }
  if (method.toUpperCase() !== 'GET') {
    reqParams.data = payload
  }
  return new Promise((resolve, reject) => {
    axios(reqParams)
      .then((response: any) => {
        const error = response.data?.error
        if (error) {
          reject(error)
        }
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response && error.response.data)
        console.error('fetch error', error)
      })
  })
}

export default request

export class HTTPError extends Error {
  code: number
  details: any

  constructor(message: string, code: number, details: any) {
    super(message)
    this.message = message
    this.code = code
    this.details = details
  }
}
