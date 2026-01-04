export type ProductVariant = {
  id?: string // Optional for creation, required after save
  color: string
  colorHex?: string
  image: string
  images?: string[]
  sku: string
  quantity: number
  price: number
  price_sale?: number // Match backend snake_case
  size?: string
  material?: string
}

// Backend ProductStatus enum
export type ProductStatus = "NEW" | "HOT" | "NONE"

export type Product = {
  id?: string // Optional for creation, required after save
  name: string
  slug?: string
  status?: ProductStatus
  discount?: number
  category: string // Match backend (not categoryId)
  measurement: string
  description: string
  // Frontend specific fields (from MockProducts)
  stars_evaluate?: number
  stars_evaluation?: number // Backend field name
  rating_count?: number
  // Backend fields
  brand?: string
  material?: string
  weight?: number
  warranty?: string
  tags?: string[]
  images?: string[]
  meta_title?: string
  meta_description?: string
  variants: ProductVariant[]
  is_featured?: boolean
  is_active?: boolean
  views_count?: number
  publish_date?: string | null
  sale_start_date?: string | null
  sale_end_date?: string | null
  created_at?: string
  updated_at?: string
}

export type ProductListResponse = {
  data: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type ProductFilters = {
  page?: number
  limit?: number
  category?: string
  search?: string
  min_price?: number
  max_price?: number
  sort_by?: "price" | "name" | "created_at"
  sort_order?: "asc" | "desc"
  status?: ProductStatus
  is_featured?: boolean
  is_active?: boolean
}
