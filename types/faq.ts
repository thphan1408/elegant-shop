// FAQ Types
export type FAQCategory =
  | "PRIVACY_POLICY"
  | "TERMS_OF_SERVICE"
  | "PRODUCT_POLICY"
  | "SHIPPING"
  | "RETURNS"
  | "WARRANTY"
  | "PAYMENT"
  | "GENERAL"

export type FAQ = {
  id: string
  question: string
  answer: string // Có thể là HTML/Markdown với embedded images
  category: FAQCategory
  productId?: string | null // Null nếu là global FAQ, có giá trị nếu là FAQ cho sản phẩm cụ thể
  images: string[] // Array of Cloudinary image URLs
  attachments: string[] // Array of Cloudinary file URLs (PDF, DOC, etc.)
  order: number // Thứ tự hiển thị
  is_active: boolean
  created_at: string // ISO date string
  updated_at: string // ISO date string
}

export type CreateFAQData = {
  question: string
  answer: string
  category?: FAQCategory
  productId?: string | null
  images?: string[]
  attachments?: string[]
  order?: number
  is_active?: boolean
}

export type UpdateFAQData = {
  question?: string
  answer?: string
  category?: FAQCategory
  productId?: string | null
  images?: string[]
  attachments?: string[]
  order?: number
  is_active?: boolean
}

export type FAQListResponse = {
  data: FAQ[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type FAQFilters = {
  category?: FAQCategory
  productId?: string | null // null for global FAQ only, UUID for product-specific FAQ, undefined for both
  is_active?: boolean
  page?: number
  limit?: number
  order?: string // Sort order field
  sort_by?: "created_at" | "order" | "question"
  sort_order?: "asc" | "desc"
}

export type UploadImageResponse = {
  url: string
  publicId: string
}

export type UploadFileResponse = {
  url: string
  publicId: string
}
