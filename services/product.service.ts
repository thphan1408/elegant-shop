import api from "@/services/api"
import type { Product } from "@/types"
import { handleApiResponse } from "./api-utils"

// Get all products (homepage)
export const getProducts = async (params?: Record<string, any>) => {
  try {
    const response = await api.get("/products", { params })
    return handleApiResponse(response)
  } catch (error) {
    throw new Error(
      "Failed to fetch products. Please check if the API is running.",
    )
  }
}

// Get products by category
export const getProductsByCategory = async (category: string) => {
  try {
    const response = await api.get("/products", {
      params: { category },
    })
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to fetch products")
  }
}

// Get product by ID (detail page)
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await api.get(`/products/${id}`)
    return handleApiResponse(response)
  } catch (error) {
    // Return null if product not found (404)
    if ((error as any).response?.status === 404) {
      return null
    }

    throw new Error(
      "Failed to fetch product. Please check if the API is running.",
    )
  }
}

// Create product (admin, nếu cần sau)
export const createProduct = async (data: any) => {
  try {
    const response = await api.post("/products", data)
    return response.data
  } catch (error) {
    throw new Error("Failed to create product")
  }
}

// Update product (PATCH)
export const updateProduct = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/products/${id}`, data)
    return response.data
  } catch (error) {
    throw new Error("Failed to update product")
  }
}

// Delete product
export const deleteProduct = async (id: string) => {
  try {
    await api.delete(`/products/${id}`)
  } catch (error) {
    throw new Error("Failed to delete product")
  }
}

// Cleanup expired sales - Reset prices when sale ends
export const cleanupExpiredSales = async () => {
  try {
    const response = await api.post("/products/cleanup-expired-sales")
    return response.data
  } catch (error) {
    throw new Error("Failed to cleanup expired sales")
  }
}
