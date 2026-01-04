import api from "@/services/api"
import { handleApiResponse } from "./api-utils"
import type {
  FAQ,
  CreateFAQData,
  UpdateFAQData,
  FAQListResponse,
  FAQFilters,
  UploadImageResponse,
  UploadFileResponse,
} from "@/types/faq"

// Get all FAQs
export const getFAQs = async (
  filters?: FAQFilters,
): Promise<FAQListResponse> => {
  try {
    const response = await api.get("/faqs", { params: filters })
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to fetch FAQs")
  }
}

// Get FAQ by ID
export const getFAQById = async (id: string): Promise<FAQ | null> => {
  try {
    const response = await api.get(`/faqs/${id}`)
    return handleApiResponse(response)
  } catch (error) {
    if ((error as any).response?.status === 404) {
      return null
    }
    throw new Error("Failed to fetch FAQ")
  }
}

// Get FAQs với category = GENERAL (dùng cho sản phẩm)
// FAQ cho từng sản phẩm cụ thể sẽ được xử lý sau
export const getFAQsByProduct = async (productId: string): Promise<FAQ[]> => {
  try {
    const filters = {
      category: "GENERAL" as const,
      is_active: true,
      page: 1,
      limit: 100, // Lấy tất cả FAQs có category = GENERAL
    }

    const response = await api.get("/faqs", { params: filters })

    const processedData = handleApiResponse(response) as FAQListResponse

    // Trả về data array từ FAQListResponse
    const faqs = processedData?.data || []

    return faqs
  } catch (error) {
    throw new Error("Failed to fetch FAQs for product")
  }
}

// Create a new FAQ
export const createFAQ = async (data: CreateFAQData): Promise<FAQ> => {
  try {
    const response = await api.post("/faqs", data)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to create FAQ")
  }
}

// Update FAQ
export const updateFAQ = async (
  id: string,
  data: UpdateFAQData,
): Promise<FAQ> => {
  try {
    const response = await api.patch(`/faqs/${id}`, data)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to update FAQ")
  }
}

// Delete FAQ
export const deleteFAQ = async (id: string): Promise<void> => {
  try {
    await api.delete(`/faqs/${id}`)
  } catch (error) {
    throw new Error("Failed to delete FAQ")
  }
}

// Upload image to Cloudinary
export const uploadFAQImage = async (
  file: File | FormData,
): Promise<UploadImageResponse> => {
  try {
    const formData = file instanceof FormData ? file : new FormData()
    if (file instanceof File) {
      formData.append("image", file)
    }
    const response = await api.post("/faqs/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to upload image")
  }
}

// Upload file to Cloudinary
export const uploadFAQFile = async (
  file: File | FormData,
): Promise<UploadFileResponse> => {
  try {
    const formData = file instanceof FormData ? file : new FormData()
    if (file instanceof File) {
      formData.append("file", file)
    }
    const response = await api.post("/faqs/upload/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to upload file")
  }
}

// Delete file from Cloudinary
export const deleteFAQFile = async (publicId: string): Promise<void> => {
  try {
    await api.delete(`/faqs/upload/${publicId}`)
  } catch (error) {
    throw new Error("Failed to delete file")
  }
}
