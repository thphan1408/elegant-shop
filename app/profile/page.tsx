"use client"

import { useUser } from "@/store/auth-store"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { useIsAuthenticated } from "@/store/auth-store"
import Image from "next/image"
import { Camera } from "lucide-react"

export default function ProfilePage() {
  const user = useUser()
  const isAuthenticated = useIsAuthenticated()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in?redirect=/profile")
    }
  }, [isAuthenticated, router])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB")
        return
      }

      setSelectedFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadAvatar = async () => {
    if (!selectedFile) return

    // TODO: Implement API call to upload avatar
    // const formData = new FormData()
    // formData.append("avatar", selectedFile)
    // await uploadAvatar(formData)

    console.log("Avatar file selected:", selectedFile.name)
    // For now, just show a message
    alert("Avatar upload will be implemented with API")
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const displayUsername = user.username || user.email?.split("@")[0] || "Not set"
  const displayAvatar = avatarPreview || user.avatar

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-0 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">My Profile</h1>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-03 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-02 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
              {displayAvatar ? (
              <Image
                  src={displayAvatar}
                alt={user.name || "User"}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/svg/user-circle.svg"
                alt="User"
                width={48}
                height={48}
                className="text-neutral-04"
              />
            )}
            </div>
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary-1 rounded-full flex items-center justify-center hover:bg-primary-2 transition-colors shadow-md"
              aria-label="Change avatar"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              {user.name || user.username || "User"}
            </h2>
            <p className="text-sm sm:text-base text-neutral-05">{user.email}</p>
            {selectedFile && (
              <button
                onClick={handleUploadAvatar}
                className="mt-3 px-4 py-2 bg-primary-1 text-white rounded-md hover:bg-primary-2 transition-colors text-sm"
              >
                Upload Avatar
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs sm:text-sm font-medium text-neutral-07">
              Username
            </span>
            <span className="text-sm sm:text-base text-neutral-05">
              {displayUsername}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs sm:text-sm font-medium text-neutral-07">
              Email
            </span>
            <span className="text-sm sm:text-base text-neutral-05">
              {user.email}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs sm:text-sm font-medium text-neutral-07">
              Name
            </span>
            <span className="text-sm sm:text-base text-neutral-05">
              {user.name || "Not set"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs sm:text-sm font-medium text-neutral-07">
              User ID
            </span>
            <span className="text-sm sm:text-base text-neutral-05 font-mono">
              {user.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

