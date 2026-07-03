/**
 * Utility functions for review-related operations
 */

/**
 * Format time ago string (e.g., "5 phút trước", "2 giờ trước")
 */
export const formatTimeAgo = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)

  // Validate date
  if (isNaN(date.getTime())) {
    return ""
  }

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 0) {
    return "vừa xong"
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds} giây trước`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} ngày trước`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} năm trước`
}

/**
 * Validate review content
 */
export const validateReviewContent = (
  content: string,
): {
  isValid: boolean
  error?: string
} => {
  const trimmed = content.trim()

  if (!trimmed) {
    return { isValid: false, error: "Please write your review" }
  }

  if (trimmed.length < 10) {
    return { isValid: false, error: "Review must be at least 10 characters" }
  }

  if (trimmed.length > 5000) {
    return { isValid: false, error: "Review must be less than 5000 characters" }
  }

  return { isValid: true }
}

/**
 * Validate rating
 */
export const validateRating = (
  rating: number,
): {
  isValid: boolean
  error?: string
} => {
  if (rating === 0) {
    return { isValid: false, error: "Please select a rating" }
  }

  if (rating < 1 || rating > 5) {
    return { isValid: false, error: "Rating must be between 1 and 5" }
  }

  return { isValid: true }
}

/**
 * Sanitize user input (additional layer of security)
 */
export const sanitizeReviewContent = (content: string): string => {
  // Remove potential XSS patterns
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
}

/**
 * Check if URL is safe for image src
 */
export const isValidImageUrl = (url: string | undefined | null): boolean => {
  if (!url) return false

  try {
    const urlObj = new URL(url, window.location.origin)
    // Only allow http, https, and data URLs (with restrictions)
    const allowedProtocols = ["http:", "https:", "data:"]
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return false
    }

    // For data URLs, only allow image types
    if (urlObj.protocol === "data:") {
      const dataUrlPattern =
        /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml);base64,/
      return dataUrlPattern.test(url)
    }

    return true
  } catch {
    return false
  }
}
