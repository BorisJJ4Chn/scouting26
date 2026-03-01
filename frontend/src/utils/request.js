import axios from 'axios'

const MAX_RETRY = 5
const RETRY_DELAY = 1000

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

// 请求拦截器，自动添加认证token
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const createRetryWrapper = (method) => {
  return async (...args) => {
    let lastError
    let currentDelay = RETRY_DELAY

    for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
      try {
        return await axiosInstance[method](...args)
      } catch (error) {
        lastError = error

        if (attempt === MAX_RETRY) {
          break
        }

        if (error.response?.status < 500) {
          break
        }

        await new Promise(resolve => setTimeout(resolve, currentDelay))
        currentDelay *= 2
      }
    }

    throw lastError
  }
}

export const request = {
  get: createRetryWrapper('get'),
  post: createRetryWrapper('post'),
  put: createRetryWrapper('put'),
  delete: createRetryWrapper('delete'),
  patch: createRetryWrapper('patch'),
  head: createRetryWrapper('head'),
  options: createRetryWrapper('options'),
}
