export const handleApiResponse = (response: any) => {
  let result = response

  if (result?.data !== undefined) {
    result = result.data
  }

  if (result?.statusCode !== undefined && result?.data !== undefined) {
    result = result.data
  }

  if (
    result &&
    typeof result === "object" &&
    !Array.isArray(result) &&
    result.data !== undefined
  ) {
    if (Array.isArray(result.data)) {
    return result.data
  }
    if (
      typeof result.data === "object" &&
      !Array.isArray(result.data) &&
      Array.isArray(result.data.data)
    ) {
      return result.data.data
    }
  }

  if (Array.isArray(result)) {
    return result
  }

  return result
}
