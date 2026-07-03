"use client"
import React, { useState, useMemo, useCallback, memo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import type { Product } from "@/types"
import { cn } from "@/lib/utils"
import {
  useReviewsByProduct,
  useCreateOrUpdateReview,
  useUpdateReview,
  useDeleteReview,
  useReactToReview,
  useRemoveReaction,
  useCreateReply,
  useUpdateReply,
  useDeleteReply,
  useReplies,
  useReviewReactions,
} from "@/lib/hooks/use-reviews"
import type { Review, ReviewReply, ReviewReaction } from "@/types/review"
import type { User } from "@/store/auth-store"
import { useFAQs } from "@/lib/hooks/use-faqs"
import { useAutoResize } from "@/lib/hooks/use-auto-resize"
import {
  formatTimeAgo,
  validateReviewContent,
  validateRating,
  sanitizeReviewContent,
} from "@/lib/utils/review-utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StarRating } from "@/components/ui/star-rating"
import { UserAvatar } from "@/components/ui/user-avatar"
import {
  Smile,
  Edit2,
  Trash2,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
} from "lucide-react"
import { useIsAuthenticated, useUser } from "@/store/auth-store"
import { toast } from "sonner"
import dynamic from "next/dynamic"

// Dynamically import emoji picker to avoid SSR issues
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false })

// Constants
const MAX_REVIEW_LENGTH = 5000
const MIN_REVIEW_LENGTH = 10
const STAR_ARRAY = Array.from({ length: 5 }) // Memoized for performance

interface ProductReviewProps {
  product: Product
}

type TabId = "additional-info" | "questions" | "reviews"

interface TabConfig {
  id: TabId
  label: string
  value: string
  component: React.ComponentType<{ product: Product }>
}

// Tab Content Components - Có thể call API trong đây
const AdditionalInfoContent = ({ product }: { product: Product }) => {
  const additionalInfo = [
    { label: "Brand", value: product.brand },
    { label: "Material", value: product.material },
    {
      label: "Weight",
      value: product.weight ? `${product.weight} kg` : undefined,
    },
    { label: "Warranty", value: product.warranty },
    { label: "Measurement", value: product.measurement },
    { label: "Category", value: product.category },
  ].filter((item) => item.value) // Chỉ hiển thị các field có giá trị

  return (
    <div className="space-y-4 sm:space-y-6">
      {additionalInfo.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {additionalInfo.map((info, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="text-xs sm:text-sm font-medium text-neutral-07">
                {info.label}
              </span>
              <span className="text-xs sm:text-sm text-neutral-05">
                {info.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm sm:text-base text-neutral-04">
          No additional information available.
        </div>
      )}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 sm:mt-6">
          <span className="text-xs sm:text-sm font-medium text-neutral-07">
            Tags
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 sm:px-3 py-1 bg-neutral-02 text-neutral-06 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const QuestionsContent = ({ product }: { product: Product }) => {
  const {
    data: faqsResponse,
    isLoading,
    error,
  } = useFAQs({
    category: "GENERAL",
    is_active: true,
    page: 1,
    limit: 100,
  })

  if (isLoading) {
    return (
      <div className="text-xs sm:text-sm text-neutral-04">
        Loading questions...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-xs sm:text-sm text-red">
        Failed to load questions. Please try again later.
      </div>
    )
  }

  // Xử lý data: có thể là array trực tiếp hoặc object có property data
  const faqs = Array.isArray(faqsResponse)
    ? faqsResponse
    : faqsResponse?.data || []

  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-xs sm:text-sm text-neutral-04">
        No questions available yet.
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="border-b border-neutral-03 pb-4 sm:pb-6 last:border-b-0"
        >
          <div className="flex gap-3 sm:gap-4">
            {/* Question Icon */}
            <div className="shrink-0 mt-0.5">
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-neutral-06">
                <Image
                  src="/svg/question-mark.svg"
                  alt="Question icon"
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Question & Answer Content */}
            <div className="flex-1 flex flex-col gap-2 sm:gap-3">
              <h4 className="text-sm sm:text-base font-medium text-neutral-07">
                {faq.question}
              </h4>
              <div className="flex gap-2 sm:gap-3">
                <div className="shrink-0 mt-0.5">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-neutral-05 opacity-60">
                    <Image
                      src="/svg/message-circle.svg"
                      alt="Message icon"
                      width={20}
                      height={20}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-05 flex-1">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Custom confirm dialog (more secure than window.confirm)
const confirmDelete = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // In production, replace with a proper modal component
    const result = window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")
    resolve(result)
  })
}

// Review Item Component with User Info
const ReviewItem = memo(
  ({
    review,
    currentUser,
    onEdit,
    onDelete,
    editingReview,
    editContent,
    editRating,
    onEditContentChange,
    onEditRatingChange,
    onSaveEdit,
    onCancelEdit,
    isUpdating,
    onReact,
    onRemoveReaction,
    onReply,
    showReplies,
    replies,
    replyContent,
    onReplyContentChange,
    onSendReply,
    isReplying,
    isReacting,
    reactionsCount,
  }: {
    review: any
    currentUser: any
    onEdit: (review: any) => void
    onDelete: (reviewId: string) => void
    editingReview?: any
    editContent?: string
    editRating?: number
    onEditContentChange?: (value: string) => void
    onEditRatingChange?: (rating: number) => void
    onSaveEdit?: () => void
    onCancelEdit?: () => void
    isUpdating?: boolean
    onReact?: (reviewId: string, type: "like" | "dislike") => void
    onRemoveReaction?: (reviewId: string) => void
    onReply?: (reviewId: string) => void
    showReplies?: boolean
    replies?: any[]
    replyContent?: string
    onReplyContentChange?: (value: string) => void
    onSendReply?: (reviewId: string) => void
    isReplying?: boolean
    isReacting?: boolean
    reactionsCount?: { likes: number; dislikes: number }
  }) => {
    // User info is now included in review object from backend
    const user = review.user || null

    const displayName =
      user?.name || user?.username || review.userName || "Anonymous"

    // Format time ago
    const timeAgo = useMemo(
      () => (review.created_at ? formatTimeAgo(review.created_at) : ""),
      [review.created_at],
    )

    // Check if current user is the owner of this review
    const isOwner = useMemo(
      () =>
        currentUser &&
        (review.userId === currentUser.id ||
          (user && user.id === currentUser.id)),
      [currentUser, review.userId, user],
    )

    const isEditing = editingReview?.id === review.id

    // Sanitize review content for display
    const reviewContent = useMemo(() => {
      const content = review.comment || review.content || ""
      // Additional sanitization layer (backend already sanitizes, but defense in depth)
      return sanitizeReviewContent(content)
    }, [review.comment, review.content])

    // Get current user's reaction
    // Check both review.reactions array and reactionsCount to determine user's reaction
    const userReaction = useMemo(() => {
      if (!currentUser) return null

      // First, check review.reactions array (if available)
      if (review.reactions && review.reactions.length > 0) {
        const reaction = review.reactions.find(
          (r: ReviewReaction) => r.userId === currentUser.id,
        )
        if (reaction) {
          // Convert uppercase to lowercase for comparison
          return reaction.type?.toLowerCase() || null
        }
      }

      // If no reaction found in array, return null
      // Note: We can't determine user's reaction from reactionsCount alone
      // as it only contains totals, not individual user reactions
      return null
    }, [currentUser, review.reactions, review.id])

    // Use reactions count from API if available, otherwise count from review.reactions array
    const reactionCounts = useMemo(() => {
      // Prefer API data if available (check if it's a valid object with likes/dislikes)
      if (
        reactionsCount !== undefined &&
        reactionsCount !== null &&
        typeof reactionsCount === "object" &&
        ("likes" in reactionsCount || "dislikes" in reactionsCount)
      ) {
        return {
          likes: reactionsCount.likes ?? 0,
          dislikes: reactionsCount.dislikes ?? 0,
        }
      }
      // Fallback to counting from review.reactions array
      if (!review.reactions) {
        return { likes: 0, dislikes: 0 }
      }
      return review.reactions.reduce(
        (acc: { likes: number; dislikes: number }, r: ReviewReaction) => {
          const type = r.type?.toLowerCase() || ""
          if (type === "like") {
            acc.likes = (acc.likes || 0) + 1
          } else if (type === "dislike") {
            acc.dislikes = (acc.dislikes || 0) + 1
          }
          return acc
        },
        { likes: 0, dislikes: 0 },
      )
    }, [review.reactions, reactionsCount])

    const [showReplyForm, setShowReplyForm] = useState(false)

    // Optimistic reaction state: gives instant, flicker-free feedback on click.
    // It overrides the server values until the server catches up, at which point
    // the effect below clears it — producing a single seamless update, not a jump.
    const [optimisticReaction, setOptimisticReaction] = useState<{
      userReaction: "like" | "dislike" | null
      likes: number
      dislikes: number
    } | null>(null)

    const displayReaction = optimisticReaction
      ? optimisticReaction.userReaction
      : userReaction
    const displayLikes = optimisticReaction
      ? optimisticReaction.likes
      : reactionCounts.likes
    const displayDislikes = optimisticReaction
      ? optimisticReaction.dislikes
      : reactionCounts.dislikes

    React.useEffect(() => {
      if (
        optimisticReaction &&
        reactionCounts.likes === optimisticReaction.likes &&
        reactionCounts.dislikes === optimisticReaction.dislikes &&
        userReaction === optimisticReaction.userReaction
      ) {
        setOptimisticReaction(null)
      }
    }, [
      reactionCounts.likes,
      reactionCounts.dislikes,
      userReaction,
      optimisticReaction,
    ])

    const handleReactionClick = (type: "like" | "dislike") => {
      const current = displayReaction
      let likes = displayLikes
      let dislikes = displayDislikes

      if (current === type) {
        // Bấm lại reaction đang có → hủy
        if (type === "like") likes = Math.max(0, likes - 1)
        else dislikes = Math.max(0, dislikes - 1)
        setOptimisticReaction({ userReaction: null, likes, dislikes })
        onRemoveReaction?.(review.id)
      } else {
        // Thêm mới hoặc đổi từ like<->dislike
        if (current === "like") likes = Math.max(0, likes - 1)
        if (current === "dislike") dislikes = Math.max(0, dislikes - 1)
        if (type === "like") likes += 1
        else dislikes += 1
        setOptimisticReaction({ userReaction: type, likes, dislikes })
        onReact?.(review.id, type)
      }
    }

    return (
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <UserAvatar
            avatar={user?.avatar || review.userAvatar}
            name={displayName}
            size={48}
          />
        </div>

        {/* Review Content */}
        <div className="flex-1">
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-neutral-07">
                  {displayName}
                </div>
                {timeAgo && (
                  <span className="text-xs text-neutral-04">{timeAgo}</span>
                )}
              </div>
              {isOwner && !isEditing && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 hover:bg-neutral-02 rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-neutral-05" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(review)}>
                      <Edit2 className="w-4 h-4" />
                      Edit Review
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(review.id)}
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Review
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            {isEditing ? (
              <div className="space-y-3 mb-3">
                {/* Edit Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-06">Rating:</span>
                  <StarRating
                    rating={editRating || 0}
                    size="sm"
                    interactive
                    onRatingChange={onEditRatingChange}
                  />
                </div>
                {/* Edit Content */}
                <Textarea
                  value={editContent || ""}
                  onChange={(e) => onEditContentChange?.(e.target.value)}
                  className="w-full bg-white border border-neutral-03 rounded-lg text-sm resize-none py-2 px-3"
                  rows={3}
                />
                {/* Edit Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={onSaveEdit}
                    disabled={isUpdating}
                    size="sm"
                    className="bg-neutral-07 text-neutral-01 hover:bg-neutral-06 h-8 px-4 text-sm"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    onClick={onCancelEdit}
                    disabled={isUpdating}
                    variant="outline"
                    size="sm"
                    className="h-8 px-4 text-sm border-neutral-03 hover:bg-neutral-02 hover:text-neutral-07"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-2">
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="text-sm text-neutral-06 mb-3 leading-relaxed">
                  {reviewContent}
                </p>
              </>
            )}
          </div>
          {!isEditing && (
            <>
              {/* Reaction Buttons */}
              <div className="flex items-center gap-4 mb-3">
                <button
                  onClick={() => handleReactionClick("like")}
                  disabled={isReacting}
                  className={cn(
                    "flex items-center gap-1.5 text-sm transition-colors",
                    displayReaction === "like"
                      ? "text-primary-1 font-medium"
                      : "text-neutral-05 hover:text-neutral-07",
                  )}
                >
                  <ThumbsUp
                    className={cn(
                      "w-4 h-4 transition-colors",
                      displayReaction === "like"
                        ? "fill-primary-1 text-primary-1"
                        : "fill-transparent",
                    )}
                  />
                  <span>{displayLikes}</span>
                </button>
                <button
                  onClick={() => handleReactionClick("dislike")}
                  disabled={isReacting}
                  className={cn(
                    "flex items-center gap-1.5 text-sm transition-colors",
                    displayReaction === "dislike"
                      ? "text-red-600 font-medium"
                      : "text-neutral-05 hover:text-neutral-07",
                  )}
                >
                  <ThumbsDown
                    className={cn(
                      "w-4 h-4 transition-colors",
                      displayReaction === "dislike"
                        ? "fill-red-600 text-red-600"
                        : "fill-transparent",
                    )}
                  />
                  <span>{displayDislikes}</span>
                </button>
                <button
                  onClick={() => {
                    setShowReplyForm(!showReplyForm)
                    if (!showReplyForm) {
                      onReply?.(review.id)
                    }
                  }}
                  className="flex items-center gap-1.5 text-sm text-neutral-05 hover:text-neutral-07 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Reply
                </button>
              </div>

              {/* Reply Form */}
              {showReplyForm && (
                <div className="mt-3 p-3 bg-neutral-01 rounded-lg border border-neutral-03">
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyContent || ""}
                    onChange={(e) => onReplyContentChange?.(e.target.value)}
                    className="w-full bg-white border border-neutral-03 rounded-lg text-sm resize-none py-2 px-3 mb-2"
                    rows={2}
                    maxLength={1000}
                  />
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => {
                        setShowReplyForm(false)
                        onReplyContentChange?.("")
                      }}
                      variant="outline"
                      size="sm"
                      className="h-8 px-4 text-sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (replyContent?.trim()) {
                          onSendReply?.(review.id)
                          setShowReplyForm(false)
                        }
                      }}
                      disabled={!replyContent?.trim() || isReplying}
                      size="sm"
                      className="bg-neutral-07 text-neutral-01 hover:bg-neutral-06 h-8 px-4 text-sm"
                    >
                      {isReplying ? "Sending..." : "Send"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Replies List */}
              {showReplies && replies && replies.length > 0 && (
                <div className="mt-4 space-y-3 pl-4 border-l-2 border-neutral-03">
                  {replies.map(
                    (
                      reply: ReviewReply & {
                        user?: {
                          id: string
                          name?: string
                          username?: string
                          avatar?: string
                        }
                      },
                    ) => {
                      const replyUser = reply.user || null
                      const replyDisplayName =
                        replyUser?.name || replyUser?.username || "Anonymous"
                      const replyTimeAgo = reply.createdAt
                        ? formatTimeAgo(reply.createdAt)
                        : ""

                      return (
                        <div key={reply.id} className="flex gap-3">
                          <UserAvatar
                            avatar={replyUser?.avatar}
                            name={replyDisplayName}
                            size={32}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-neutral-07">
                                {replyDisplayName}
                              </span>
                              {replyTimeAgo && (
                                <span className="text-xs text-neutral-04">
                                  {replyTimeAgo}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-neutral-06 leading-relaxed">
                              {sanitizeReviewContent(reply.content)}
                            </p>
                          </div>
                        </div>
                      )
                    },
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  },
)

ReviewItem.displayName = "ReviewItem"

// Wrapper component to fetch replies for a review
const ReviewItemWithReplies = memo(
  (props: {
    review: Review
    currentUser: User | null
    onEdit: (review: Review) => void
    onDelete: (reviewId: string) => void
    editingReview?: Review | null
    editContent?: string
    editRating?: number
    onEditContentChange?: (value: string) => void
    onEditRatingChange?: (rating: number) => void
    onSaveEdit?: () => void
    onCancelEdit?: () => void
    isUpdating?: boolean
    onReact?: (reviewId: string, type: "like" | "dislike") => void
    onRemoveReaction?: (reviewId: string) => void
    onReply?: (reviewId: string) => void
    showReplies?: boolean
    replyContent?: string
    onReplyContentChange?: (value: string) => void
    onSendReply?: (reviewId: string) => void
    isReplying?: boolean
    isReacting?: boolean
    onUpdateReply?: (replyId: string, reviewId: string) => void
    onDeleteReply?: (replyId: string, reviewId: string) => void
    editingReply?: { replyId: string; reviewId: string } | null
    editReplyContent?: Record<string, string>
    onEditReplyContentChange?: (replyId: string, value: string) => void
    isUpdatingReply?: boolean
  }) => {
    // Fetch replies for this review
    const { data: repliesData } = useReplies(props.review.id, {
      enabled: props.showReplies || false,
    })

    // Fetch reactions count for this review. Thanks to keepPreviousData in the
    // hook, reactionsData keeps its last value during refetch (no flicker).
    const { data: reactionsData } = useReviewReactions(props.review.id)

    const reactionsCountToPass = React.useMemo(() => {
      if (
        reactionsData &&
        typeof reactionsData === "object" &&
        ("likes" in reactionsData || "dislikes" in reactionsData)
      ) {
        return {
          likes: reactionsData.likes ?? 0,
          dislikes: reactionsData.dislikes ?? 0,
        }
      }
      return undefined
    }, [reactionsData])

    return (
      <ReviewItem
        {...props}
        replies={repliesData || []}
        reactionsCount={reactionsCountToPass}
      />
    )
  },
)

ReviewItemWithReplies.displayName = "ReviewItemWithReplies"

const ReviewsContent = ({ product }: { product: Product }) => {
  const user = useUser()
  const {
    data,
    isLoading,
    error,
    refetch: refetchReviews,
  } = useReviewsByProduct(product.id || "")
  const isAuthenticated = useIsAuthenticated()
  const {
    handleChange: handleTextareaChange,
    handleInput: handleTextareaInput,
  } = useAutoResize()
  const createReviewMutation = useCreateOrUpdateReview()
  const updateReviewMutation = useUpdateReview()
  const deleteReviewMutation = useDeleteReview()
  const reactToReviewMutation = useReactToReview()
  const removeReactionMutation = useRemoveReaction()
  const createReplyMutation = useCreateReply()
  const updateReplyMutation = useUpdateReply()
  const deleteReplyMutation = useDeleteReply()

  const [reviewContent, setReviewContent] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10) // Show 10 reviews per page
  const [editingReply, setEditingReply] = useState<{
    replyId: string
    reviewId: string
  } | null>(null)
  const [editReplyContent, setEditReplyContent] = useState<
    Record<string, string>
  >({})
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [editContent, setEditContent] = useState("")
  const [editRating, setEditRating] = useState(0)
  const [replyingToReview, setReplyingToReview] = useState<string | null>(null)
  const [replyContents, setReplyContents] = useState<Record<string, string>>({})
  const [showRepliesFor, setShowRepliesFor] = useState<Record<string, boolean>>(
    {},
  )
  const [reactingToReview, setReactingToReview] = useState<string | null>(null)
  const reactingRef = React.useRef<string | null>(null)
  // Rate limiting: track last request time for each review
  const lastRequestTimeRef = React.useRef<Record<string, number>>({})
  // Track pending requests to prevent duplicate calls
  const pendingRequestsRef = React.useRef<Set<string>>(new Set())
  // Minimum time between requests (500ms) - prevents spam
  const MIN_REQUEST_INTERVAL = 500

  // Normalize data: handle both array and ReviewListResponse object
  const reviewsData = React.useMemo(() => {
    if (!data) return null

    if (Array.isArray(data)) {
      return {
        data: data,
        total: data.length,
        page: 1,
        limit: data.length,
        totalPages: 1,
      }
    }

    if (data && typeof data === "object" && "data" in data) {
      return data
    }

    return null
  }, [data])

  // Calculate average rating
  const averageRating = React.useMemo(() => {
    if (!reviewsData?.data || reviewsData.data.length === 0) return 0
    const sum = reviewsData.data.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviewsData.data.length
  }, [reviewsData])

  // Check if current user has already reviewed this product
  const userHasReviewed = React.useMemo(() => {
    if (!user || !reviewsData?.data) return false
    return reviewsData.data.some(
      (review) =>
        review.userId === user.id ||
        (review.user && review.user.id === user.id),
    )
  }, [user, reviewsData])

  // Sort reviews
  const sortedReviews = React.useMemo(() => {
    if (!reviewsData?.data) return []
    const reviews = [...reviewsData.data]
    switch (sortBy) {
      case "newest":
        return reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
      case "oldest":
        return reviews.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
      case "highest":
        return reviews.sort((a, b) => b.rating - a.rating)
      case "lowest":
        return reviews.sort((a, b) => a.rating - b.rating)
      default:
        return reviews
    }
  }, [reviewsData, sortBy])

  // Pagination logic
  const totalPages = Math.ceil(sortedReviews.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayedReviews = sortedReviews.slice(startIndex, endIndex)
  const hasMore = currentPage < totalPages
  const hasPrevious = currentPage > 1

  const handleWriteReview = useCallback(async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to write a review")
      return
    }

    // Validate content
    const contentValidation = validateReviewContent(reviewContent)
    if (!contentValidation.isValid) {
      toast.error(contentValidation.error || "Invalid review content")
      return
    }

    // Validate rating
    const ratingValidation = validateRating(selectedRating)
    if (!ratingValidation.isValid) {
      toast.error(ratingValidation.error || "Invalid rating")
      return
    }

    try {
      // Sanitize content before sending
      const sanitizedContent = sanitizeReviewContent(reviewContent)

      await createReviewMutation.mutateAsync({
        productId: product.id!,
        rating: selectedRating,
        comment: sanitizedContent,
      })
      toast.success("Review submitted successfully!")
      setReviewContent("")
      setSelectedRating(0)
    } catch (error) {
      toast.error("Failed to submit review. Please try again.")
    }
  }, [
    isAuthenticated,
    reviewContent,
    selectedRating,
    product.id,
    createReviewMutation,
  ])

  const handleEditReview = (review: Review) => {
    setEditingReview(review)
    setEditContent(review.content || "")
    setEditRating(review.rating || 0)
  }

  const handleCancelEdit = () => {
    setEditingReview(null)
    setEditContent("")
    setEditRating(0)
  }

  const handleSaveEdit = useCallback(async () => {
    if (!editingReview) return

    // Validate content
    const contentValidation = validateReviewContent(editContent)
    if (!contentValidation.isValid) {
      toast.error(contentValidation.error || "Invalid review content")
      return
    }

    // Validate rating
    const ratingValidation = validateRating(editRating)
    if (!ratingValidation.isValid) {
      toast.error(ratingValidation.error || "Invalid rating")
      return
    }

    try {
      // Sanitize content before sending
      const sanitizedContent = sanitizeReviewContent(editContent)

      await updateReviewMutation.mutateAsync({
        id: editingReview.id,
        data: {
          rating: editRating,
          comment: sanitizedContent,
        },
      })
      toast.success("Review updated successfully!")
      setEditingReview(null)
      setEditContent("")
      setEditRating(0)
    } catch (error) {
      toast.error("Failed to update review. Please try again.")
    }
  }, [editingReview, editContent, editRating, updateReviewMutation])

  const handleDeleteReview = useCallback(
    async (reviewId: string) => {
      const confirmed = await confirmDelete()
      if (!confirmed) {
        return
      }

      try {
        await deleteReviewMutation.mutateAsync(reviewId)
        toast.success("Review deleted successfully!")
      } catch (error) {
        toast.error("Failed to delete review. Please try again.")
      }
    },
    [deleteReviewMutation],
  )

  // Handle react to review with rate limiting and spam protection
  const handleReact = useCallback(
    async (reviewId: string, type: "like" | "dislike") => {
      if (!isAuthenticated) {
        toast.error("Please sign in to react to reviews")
        return
      }

      if (!user?.id) {
        toast.error("User information is missing. Please sign in again.")
        return
      }

      // Rate limiting: Check if request was made too recently
      const now = Date.now()
      const lastRequestTime = lastRequestTimeRef.current[reviewId] || 0
      const timeSinceLastRequest = now - lastRequestTime

      if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        // Request too soon, ignore it
        return
      }

      // Check if there's already a pending request for this review
      if (pendingRequestsRef.current.has(reviewId)) {
        // Request already in progress, ignore duplicate
        return
      }

      // Set reacting state for this specific review
      reactingRef.current = reviewId
      setReactingToReview(reviewId)
      pendingRequestsRef.current.add(reviewId)
      lastRequestTimeRef.current[reviewId] = now

      try {
        const reactionData = {
          reaction: type.toUpperCase() as "LIKE" | "DISLIKE",
          userId: user.id,
        }
        await reactToReviewMutation.mutateAsync({
          id: reviewId,
          data: reactionData,
        })
        // Mutation's onSuccess callback will handle invalidating queries
        // Clear reacting state immediately after mutation completes
        // The queries will be refetched automatically by React Query
        reactingRef.current = null
        setReactingToReview(null)
        pendingRequestsRef.current.delete(reviewId)
      } catch (error) {
        toast.error("Failed to react to review. Please try again.")
        // Clear reacting state on error too
        reactingRef.current = null
        setReactingToReview(null)
        pendingRequestsRef.current.delete(reviewId)
      }
    },
    [isAuthenticated, user, reactToReviewMutation],
  )

  // Handle remove reaction with rate limiting and spam protection
  const handleRemoveReaction = useCallback(
    async (reviewId: string) => {
      if (!isAuthenticated) {
        return
      }

      // Rate limiting: Check if request was made too recently
      const now = Date.now()
      const lastRequestTime = lastRequestTimeRef.current[reviewId] || 0
      const timeSinceLastRequest = now - lastRequestTime

      if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        // Request too soon, ignore it
        return
      }

      // Check if there's already a pending request for this review
      if (pendingRequestsRef.current.has(reviewId)) {
        // Request already in progress, ignore duplicate
        return
      }

      // Set reacting state for this specific review
      reactingRef.current = reviewId
      setReactingToReview(reviewId)
      pendingRequestsRef.current.add(reviewId)
      lastRequestTimeRef.current[reviewId] = now

      try {
        await removeReactionMutation.mutateAsync(reviewId)
        // Mutation's onSuccess callback will handle invalidating queries
        // Clear reacting state immediately after mutation completes
        // The queries will be refetched automatically by React Query
        reactingRef.current = null
        setReactingToReview(null)
        pendingRequestsRef.current.delete(reviewId)
      } catch (error) {
        toast.error("Failed to remove reaction. Please try again.")
        // Clear reacting state on error too
        reactingRef.current = null
        setReactingToReview(null)
        pendingRequestsRef.current.delete(reviewId)
      }
    },
    [isAuthenticated, removeReactionMutation],
  )

  // Handle reply to review
  const handleReply = useCallback(
    (reviewId: string) => {
      if (!isAuthenticated) {
        toast.error("Please sign in to reply to reviews")
        return
      }
      setReplyingToReview(reviewId)
      if (!showRepliesFor[reviewId]) {
        setShowRepliesFor((prev) => ({ ...prev, [reviewId]: true }))
      }
    },
    [isAuthenticated, showRepliesFor],
  )

  // Handle send reply
  const handleSendReply = useCallback(
    async (reviewId: string) => {
      const replyContent = replyContents[reviewId]?.trim()
      if (!replyContent) {
        toast.error("Please write your reply")
        return
      }

      if (replyContent.length < 5) {
        toast.error("Reply must be at least 5 characters")
        return
      }

      try {
        const sanitizedContent = sanitizeReviewContent(replyContent)
        if (!user?.id) {
          toast.error("User information is missing. Please sign in again.")
          return
        }

        await createReplyMutation.mutateAsync({
          reviewId,
          data: {
            content: sanitizedContent,
            userId: user.id,
          },
        })
        toast.success("Reply sent successfully!")
        setReplyContents((prev) => ({ ...prev, [reviewId]: "" }))
        setReplyingToReview(null)
        // Replies will be refetched automatically via query invalidation
      } catch (error) {
        toast.error("Failed to send reply. Please try again.")
      }
    },
    [replyContents, createReplyMutation],
  )

  if (isLoading) {
    return (
      <div className="text-xs sm:text-sm text-neutral-04">
        Loading reviews...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-xs sm:text-sm text-red">
        Failed to load reviews. Please try again later.
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-07 mb-2">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-2 mb-1">
          <StarRating rating={Math.floor(averageRating)} size="md" />
          <span className="text-sm text-neutral-05">
            {reviewsData?.total || 0} Review
            {reviewsData?.total !== 1 ? "s" : ""}
          </span>
        </div>
        <p className="text-sm text-neutral-06">{product.name}</p>
      </div>

      {/* Write Review Section - Only show if user hasn't reviewed yet */}
      {isAuthenticated && !userHasReviewed && (
        <>
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Textarea
                placeholder="Write your review here..."
                value={reviewContent}
                onChange={(e) => {
                  const value = e.target.value
                  // Limit input length
                  if (value.length <= MAX_REVIEW_LENGTH) {
                    setReviewContent(value)
                    handleTextareaChange(e)
                  } else {
                    toast.error(
                      `Review must be less than ${MAX_REVIEW_LENGTH} characters`,
                    )
                  }
                }}
                onInput={handleTextareaInput}
                maxLength={MAX_REVIEW_LENGTH}
                className="w-full bg-white border border-neutral-03 rounded-lg text-sm resize-none py-2 pl-3 pr-48 wrap-break-word"
              />
              {/* Emoji Reactions and Button inside textarea */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                {/* Emoji Picker Button */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 cursor-pointer hover:bg-neutral-01 transition-colors">
                      <Smile className="h-5 w-5 text-neutral-06" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-auto p-0 border-0 shadow-lg"
                  >
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        setReviewContent((prev) => prev + emojiData.emoji)
                      }}
                      width={350}
                      height={400}
                      searchDisabled={false}
                      skinTonesDisabled={false}
                      previewConfig={{
                        showPreview: true,
                      }}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Write Review Button */}
                <Button
                  onClick={handleWriteReview}
                  disabled={createReviewMutation.isPending}
                  className="bg-neutral-07 text-neutral-01 hover:bg-neutral-06 h-8 px-4 text-sm rounded-lg"
                >
                  {createReviewMutation.isPending
                    ? "Submitting..."
                    : "Write Review"}
                </Button>
              </div>
            </div>
          </div>

          {/* Rating Selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-06">Your rating:</span>
            <StarRating
              rating={selectedRating}
              size="md"
              interactive
              onRatingChange={setSelectedRating}
              hoveredRating={hoveredRating}
              onHover={setHoveredRating}
              onMouseLeave={() => setHoveredRating(0)}
            />
          </div>
        </>
      )}

      {/* Reviews List Header */}
      {reviewsData && reviewsData.data.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-06">
              {reviewsData.total} Review{reviewsData.total !== 1 ? "s" : ""}
            </span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <ReviewItemWithReplies
                key={review.id}
                review={review}
                currentUser={user}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
                editingReview={editingReview}
                editContent={editContent}
                editRating={editRating}
                onEditContentChange={setEditContent}
                onEditRatingChange={setEditRating}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                isUpdating={updateReviewMutation.isPending}
                onReact={handleReact}
                onRemoveReaction={handleRemoveReaction}
                onReply={handleReply}
                showReplies={showRepliesFor[review.id]}
                replyContent={replyContents[review.id] || ""}
                onReplyContentChange={(value) =>
                  setReplyContents((prev) => ({
                    ...prev,
                    [review.id]: value,
                  }))
                }
                onSendReply={handleSendReply}
                isReplying={createReplyMutation.isPending}
                isReacting={reactingToReview === review.id}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={!hasPrevious}
                className="border-neutral-07 text-neutral-07 hover:bg-neutral-07 hover:text-neutral-01 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Button>
              <span className="text-sm text-neutral-06 px-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={!hasMore}
                className="border-neutral-07 text-neutral-07 hover:bg-neutral-07 hover:text-neutral-01 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {(!reviewsData || reviewsData.data.length === 0) && (
        <div className="text-sm text-neutral-04 text-center py-8">
          No reviews yet. Be the first to review this product!
        </div>
      )}
    </div>
  )
}

const tabs: TabConfig[] = [
  {
    id: "additional-info",
    label: "Additional Info",
    value: "additional-info",
    component: AdditionalInfoContent,
  },
  {
    id: "questions",
    label: "Questions",
    value: "questions",
    component: QuestionsContent,
  },
  {
    id: "reviews",
    label: "Reviews",
    value: "reviews",
    component: ReviewsContent,
  },
]

const ProductReview = ({ product }: ProductReviewProps) => {
  const [openTab, setOpenTab] = useState<string | null>("reviews")

  // Get reviews count for Reviews tab
  const { data: reviewsData } = useReviewsByProduct(product.id || "", {
    enabled: !!product.id,
  })

  const handleTabClick = (tabValue: string) => {
    // Toggle: nếu click vào tab đang mở thì đóng, nếu không thì mở tab mới
    setOpenTab(openTab === tabValue ? null : tabValue)
  }

  return (
    <section className="py-4 sm:py-6 md:py-9">
      <div className="px-4 sm:px-6 md:px-0">
        {/* Mobile/Tablet: Accordion dọc */}
        <div className="flex flex-col md:hidden gap-0">
          {tabs.map((tab) => {
            const label =
              tab.id === "reviews" && reviewsData?.total
                ? `${tab.label} (${reviewsData.total})`
                : tab.label
            const isOpen = openTab === tab.value
            const ContentComponent = tab.component

            return (
              <div key={tab.id} className="flex flex-col">
                <button
                  onClick={() => handleTabClick(tab.value)}
                  className={cn(
                    "p-0 m-0 text-neutral-04",
                    "text-base sm:text-lg font-normal leading-6 sm:leading-8 tracking-[-0.025rem]",
                    "bg-transparent rounded-none border-0 shadow-none",
                    "hover:text-primary-1 transition-colors",
                    "w-full",
                    "py-3",
                    "border-b border-neutral-03",
                    "flex items-center justify-between",
                    "text-left",
                    isOpen &&
                      "text-primary-1 font-medium border-b-2 border-primary-1",
                  )}
                >
                  <span>{label}</span>
                  <div className="ml-auto">
                    {isOpen ? (
                      <ChevronUp className="size-4 text-primary-1" />
                    ) : (
                      <ChevronDown className="size-4 text-neutral-04" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-12 pb-4 sm:pb-6">
                    <ContentComponent product={product} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Desktop: Tabs ngang */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="flex w-full gap-20 items-start justify-start border-b border-neutral-03">
              {tabs.map((tab) => {
                const label =
                  tab.id === "reviews" && reviewsData?.total
                    ? `${tab.label} (${reviewsData.total})`
                    : tab.label
                const isOpen = openTab === tab.value

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.value)}
                    className={cn(
                      "p-0 m-0 text-neutral-04",
                      "text-lg font-normal leading-8 tracking-[-0.025rem]",
                      "bg-transparent rounded-none border-0 shadow-none",
                      "hover:text-primary-1 transition-colors",
                      "relative flex-none",
                      "border-b-2 border-transparent",
                      "-mb-px",
                      isOpen &&
                        "text-primary-1 font-medium border-b-2 border-primary-1",
                    )}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="mt-12">
            {tabs.map((tab) => {
              const isOpen = openTab === tab.value
              const ContentComponent = tab.component

              return (
                isOpen && (
                  <div key={tab.id}>
                    <ContentComponent product={product} />
                  </div>
                )
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReview
