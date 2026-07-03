import api from "@/services/api"
import { handleApiResponse } from "./api-utils"
import type { AxiosError } from "axios"
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
    // Validate data
    if (!data || !data.reaction || !data.userId) {
      throw new Error("Invalid reaction data: reaction and userId are required")
    }

    const payload = {
      reaction: data.reaction,
      userId: data.userId,
    }

    await api.post(`/reviews/${id}/react`, payload)
  } catch (error) {
    // Log detailed error information
    const axiosError = error as AxiosError<{ message?: string; error?: string }>

    // Provide more specific error message based on status code
    if (axiosError?.response) {
      const status = axiosError.response.status
      const errorData = axiosError.response.data

      if (status === 401) {
        // Token expired - logout will be handled by API interceptor
        // Just throw error to let interceptor handle it
        throw new Error("Token expired. Please sign in again.")
      }
      if (status === 404) {
        throw new Error("Review not found.")
      }
      if (status === 400) {
        const message =
          errorData?.message || errorData?.error || "Invalid request data."
        throw new Error(message)
      }
      if (status === 500) {
        throw new Error("Server error. Please try again later.")
      }

      // Generic error with message from server
      const message =
        errorData?.message ||
        errorData?.error ||
        `Request failed with status ${status}`
      throw new Error(message)
    }

    // Network or other errors
    throw new Error(
      axiosError?.message ||
        "Failed to react to review. Please check your connection.",
    )
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
): Promise<{ likes: number; dislikes: number }> => {
  try {
    const response = await api.get(`/reviews/${id}/reactions`)

    const data = handleApiResponse(response) as {
      likeCount?: number
      dislikeCount?: number
      likes?: number
      dislikes?: number
    }

    // Map API response format (likeCount/dislikeCount) to our format (likes/dislikes)
    if (data && typeof data === "object") {
      return {
        likes: data.likeCount ?? data.likes ?? 0,
        dislikes: data.dislikeCount ?? data.dislikes ?? 0,
      }
    }

    return { likes: 0, dislikes: 0 }
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
    // Ensure userId is included in the payload
    const payload = {
      content: data.content,
      ...(data.parentId && { parentId: data.parentId }),
      userId: data.userId,
    }
    const response = await api.post(`/reviews/${reviewId}/replies`, payload)
    return handleApiResponse(response)
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>
    if (axiosError?.response) {
      const status = axiosError.response.status
      const errorData = axiosError.response.data
      const message =
        errorData?.message ||
        errorData?.error ||
        `Failed to create reply (${status})`
      throw new Error(message)
    }
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
