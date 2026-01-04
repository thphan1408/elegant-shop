import { create } from "zustand"
import { persist } from "zustand/middleware"

export type User = {
  id: string
  email: string
  username?: string
  name?: string
  avatar?: string
  role?: string
}

type AuthState = {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  rememberMe: boolean
}

type AuthActions = {
  setAuth: (
    user: User,
    token: string,
    refreshToken?: string,
    rememberMe?: boolean,
  ) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  refreshAccessToken: (newToken: string) => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      rememberMe: false,

      setAuth: (user, token, refreshToken, rememberMe = false) => {
        // Lưu token vào localStorage để API interceptor sử dụng
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token)
          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken)
          }

          // Set cookie với thời gian dựa trên rememberMe
          // rememberMe = true: 30 days, false: 24 hours
          const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60
          document.cookie = `token=${token}; path=/; max-age=${maxAge}`
          if (refreshToken) {
            document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${maxAge}`
          }
        }
        set({
          user,
          token,
          refreshToken: refreshToken || null,
          isAuthenticated: true,
          rememberMe,
        })
      },

      logout: () => {
        // Xóa token khỏi localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          // Xóa cookies
          document.cookie = "token=; path=/; max-age=0"
          document.cookie = "refreshToken=; path=/; max-age=0"
        }
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          rememberMe: false,
        })
      },

      updateUser: (updatedUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        }))
      },

      refreshAccessToken: (newToken) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", newToken)
          // Update cookie với cùng max-age như ban đầu
          const state = useAuthStore.getState()
          const maxAge = state.rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60
          document.cookie = `token=${newToken}; path=/; max-age=${maxAge}`
        }
        set((state) => ({ token: newToken }))
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        rememberMe: state.rememberMe,
      }),
    },
  ),
)

// Selectors
export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated)
export const useIsAdmin = () =>
  useAuthStore((state) => state.user?.role === "ADMIN" || state.user?.role === "admin")

