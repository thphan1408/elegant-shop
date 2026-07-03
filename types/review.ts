// Review Types
export type ReviewReaction = {
  id: string
  userId: string
  type: "LIKE" | "DISLIKE"
  createdAt: string
}

export type ReviewReply = {
  id: string
  reviewId: string
  userId: string
  content: string
  createdAt: string
  updatedAt: string
}

export type Review = {
  id: string
  productId: string
  userId: string
  userName?: string
  userAvatar?: string
  user?: {
    id: string
    name?: string
    username?: string
    avatar?: string
    email?: string
  }
  rating: number // 1-5
  title?: string
  content: string
  isVerifiedPurchase?: boolean
  helpfulCount?: number
  reactions?: ReviewReaction[]
  replies?: ReviewReply[]
  createdAt: string
  updatedAt: string
}

export type CreateReviewData = {
  productId: string
  rating: number
  title?: string
  comment: string
}

export type UpdateReviewData = {
  rating?: number
  title?: string
  comment?: string
}

export type ReviewReactionData = {
  reaction: "LIKE" | "DISLIKE"
  userId: string
}

export type CreateReplyData = {
  content: string
  parentId?: string // For nested replies
  userId: string // User ID who is creating the reply
}

export type UpdateReplyData = {
  content: string
}

export type ReviewListResponse = {
  data: Review[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type ReviewFilters = {
  productId?: string
  userId?: string
  rating?: number
  page?: number
  limit?: number
  sort_by?: "created_at" | "rating" | "helpful"
  sort_order?: "asc" | "desc"
}
