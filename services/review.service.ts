import api from "@/services/api"
import { handleApiResponse } from "./api-utils"
import type {
  Review,
  CreateReviewData,
  UpdateReviewData,
  ReviewReactionData,
  CreateReplyData,
  UpdateReplyData,
  ReviewListResponse,
  ReviewFilters,
  ReviewReply,
} from "@/types/review"

// Get all reviews
export const getReviews = async (
  filters?: ReviewFilters,
): Promise<ReviewListResponse> => {
  try {
    const response = await api.get("/reviews", { params: filters })
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to fetch reviews")
  }
}

// Get review by ID
export const getReviewById = async (id: string): Promise<Review | null> => {
  try {
    const response = await api.get(`/reviews/${id}`)
    return handleApiResponse(response)
  } catch (error) {
    if ((error as any).response?.status === 404) {
      return null
    }
    throw new Error("Failed to fetch review")
  }
}

// Count reviews by user
export const getReviewCountByUser = async (userId: string): Promise<number> => {
  try {
    const response = await api.get(`/reviews/users/${userId}/count`)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to fetch review count")
  }
}

// Create or update a review
export const createOrUpdateReview = async (
  data: CreateReviewData,
): Promise<Review> => {
  try {
    const response = await api.post("/reviews", data)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to create/update review")
  }
}

// Update review
export const updateReview = async (
  id: string,
  data: UpdateReviewData,
): Promise<Review> => {
  try {
    const response = await api.patch(`/reviews/${id}`, data)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to update review")
  }
}

// Delete review
export const deleteReview = async (id: string): Promise<void> => {
  try {
    await api.delete(`/reviews/${id}`)
  } catch (error) {
    throw new Error("Failed to delete review")
  }
}

// React to a review
export const reactToReview = async (
  id: string,
  data: ReviewReactionData,
): Promise<void> => {
  try {
    await api.post(`/reviews/${id}/react`, data)
  } catch (error) {
    throw new Error("Failed to react to review")
  }
}

// Remove reaction from a review
export const removeReactionFromReview = async (id: string): Promise<void> => {
  try {
    await api.delete(`/reviews/${id}/react`)
  } catch (error) {
    throw new Error("Failed to remove reaction")
  }
}

// Get reactions count for a review
export const getReviewReactions = async (
  id: string,
): Promise<{ likes: number; dislikes: number; helpful: number }> => {
  try {
    const response = await api.get(`/reviews/${id}/reactions`)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to fetch reactions")
  }
}

// Create a reply to a review
export const createReply = async (
  reviewId: string,
  data: CreateReplyData,
): Promise<ReviewReply> => {
  try {
    const response = await api.post(`/reviews/${reviewId}/replies`, data)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to create reply")
  }
}

// Get all replies for a review
export const getReplies = async (reviewId: string): Promise<ReviewReply[]> => {
  try {
    const response = await api.get(`/reviews/${reviewId}/replies`)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to fetch replies")
  }
}

// Update a reply
export const updateReply = async (
  replyId: string,
  data: UpdateReplyData,
): Promise<ReviewReply> => {
  try {
    const response = await api.patch(`/reviews/replies/${replyId}`, data)
    return handleApiResponse(response)
  } catch (error) {
    throw new Error("Failed to update reply")
  }
}

// Delete a reply
export const deleteReply = async (replyId: string): Promise<void> => {
  try {
    await api.delete(`/reviews/replies/${replyId}`)
  } catch (error) {
    throw new Error("Failed to delete reply")
  }
}
