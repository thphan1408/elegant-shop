import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import DOMPurify from "isomorphic-dompurify"
import { useAuthStore } from "@/store/auth-store"

// Base API configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Skip auth for logout endpoint or if explicitly marked
    const isLogoutRequest = config.url?.includes("/auth/logout")
    const skipAuthRetry = config.headers?.["X-Skip-Auth-Retry"] === "true"

    // Add auth token if available (but not for logout if token is expired)
    if (!isLogoutRequest || !skipAuthRetry) {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Helper to refresh token
let isRefreshing = false
let isLoggingOut = false // Prevent multiple logout redirects
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && typeof response.data === "object") {
      const sanitizeObject = (obj: any) => {
        for (const key in obj) {
          if (typeof obj[key] === "string") {
            obj[key] = DOMPurify.sanitize(obj[key], {
              ALLOWED_TAGS: ["b", "i", "p"],
            }) // Chỉ cho phép tag an toàn
          } else if (typeof obj[key] === "object") {
            sanitizeObject(obj[key])
          }
        }
      }
      sanitizeObject(response.data)
    }
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Skip retry for logout requests or if explicitly marked
    const isLogoutRequest = originalRequest.url?.includes("/auth/logout")
    const skipAuthRetry = originalRequest.headers?.["X-Skip-Auth-Retry"] === "true"

    // Handle 401 - Try to refresh token (but not for logout requests)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLogoutRequest &&
      !skipAuthRetry
    ) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refreshToken")
          : null

      if (refreshToken) {
        try {
          const response = await api.post("/auth/refresh", { refreshToken })
          const { accessToken } = response.data

          if (typeof window !== "undefined") {
            localStorage.setItem("token", accessToken)
          }

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
          }

          processQueue(null, accessToken)
          isRefreshing = false

          return api(originalRequest)
        } catch (refreshError) {
          // Refresh failed, logout user
          processQueue(refreshError, null)
          isRefreshing = false

          // Call logout from auth store to clear all state
          if (typeof window !== "undefined" && !isLoggingOut) {
            isLoggingOut = true
            useAuthStore.getState().logout()
            // Show notification and redirect to sign-in page
            setTimeout(() => {
              window.location.href = "/sign-in"
            }, 100)
          }

          return Promise.reject(refreshError)
        }
      } else {
        // No refresh token, logout user
        if (typeof window !== "undefined" && !isLoggingOut) {
          isLoggingOut = true
          useAuthStore.getState().logout()
          // Redirect to sign-in page
          setTimeout(() => {
            window.location.href = "/sign-in"
          }, 100)
        }
        processQueue(error, null)
        isRefreshing = false
      }
    }

    // Handle other errors
    if (error.response) {
      switch (error.response.status) {
        case 403:
          // Forbidden
          break
        case 404:
          // Not found
          break
        case 500:
          // Server error
          break
        default:
          break
      }
    } else if (error.request) {
      // Network error
    }

    return Promise.reject(error)
  },
)

export default api
