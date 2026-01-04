import api from "@/services/api"
import { handleApiResponse } from "./api-utils"

export type LoginData = {
  username?: string
  email?: string
  password: string
}

export type RegisterData = {
  name: string
  username: string
  email: string
  password: string
  privacyPolicy: boolean
}

export type AuthResponse = {
  user: {
    id: string
    email: string
    username?: string
    name?: string
    avatar?: string
    role?: string
  }
  accessToken: string
  refreshToken?: string
}

export type RefreshTokenResponse = {
  accessToken: string
  refreshToken?: string
}

// Register a new user
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/register", data)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to register user")
  }
}

// Login user
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/login", data)
    return handleApiResponse(response)
  } catch (error: any) {
    // Extract error message from API response
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Failed to login"
    throw new Error(errorMessage)
  }
}

// Refresh access token
export const refreshToken = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  try {
    const response = await api.post("/auth/refresh", { refreshToken })
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to refresh token")
  }
}

// Logout user
export const logout = async (): Promise<void> => {
  try {
    await api.post("/auth/logout")
  } catch (error) {
    // Even if logout fails, we should clear local state
    throw new Error("Failed to logout")
  }
}

// Get current user profile
export const getCurrentUser = async (): Promise<AuthResponse["user"]> => {
  try {
    const response = await api.post("/auth/me")
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to get user profile")
  }
}

