import { useCallback } from "react"

/**
 * Hook to auto-resize textarea based on content
 */
export const useAutoResize = () => {
  const handleResize = useCallback((textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto"
    textarea.style.height = `${Math.max(32, textarea.scrollHeight)}px`
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleResize(e.target)
    },
    [handleResize],
  )

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      handleResize(e.currentTarget)
    },
    [handleResize],
  )

  return {
    handleChange,
    handleInput,
    handleResize,
  }
}
