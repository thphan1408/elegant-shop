"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { login } from "@/services/auth.service"
import { toast } from "sonner"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username or email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  checkbox: z.boolean().optional(),
})

function SignInFormContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      checkbox: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Determine if username is email or username
      const isEmail = values.username.includes("@")
      const loginData = {
        [isEmail ? "email" : "username"]: values.username,
        password: values.password,
      }

      const response = await login(loginData)

      // Save auth state with remember me
      setAuth(
        response.user,
        response.accessToken,
        response.refreshToken,
        values.checkbox || false,
      )

      // Show success toast
      toast.success("Sign in successful!", {
        description: "Welcome back!",
      })

      // Redirect to the intended page or home
      router.push(redirect)
      router.refresh()
    } catch (err: any) {
      // Extract error message from API response
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Please check your credentials and try again."
      
      toast.error("Sign in failed", {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center gap-8 p-8 lg:p-0 lg:ml-20 lg:w-114">
      <div className="flex flex-col gap-8">
        <h1 className="headline-4">Sign in</h1>
        <div className="flex items-center gap-2">
          <p className="text-neutral-04 body-2">Don’t have an accout yet?</p>
          <Link href="/sign-up" className="text-green body-2-semi no-underline">
            Sign Up
          </Link>
        </div>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-8 flex flex-col"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your username or email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Password"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-neutral-04" />
                        ) : (
                          <Eye className="h-4 w-4 text-neutral-04" />
                        )}
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="checkbox"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="body-2 text-neutral-04">
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Link
                href="/auth/forgot-password"
                className="text-neutral-07 text-xs leading-5 font-semibold lg:text-base lg:leading-6.5 no-underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export function SignInForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInFormContent />
    </Suspense>
  )
}
