"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useIsAuthenticated } from "@/store/auth-store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
})

export default function ShippingPage() {
  const isAuthenticated = useIsAuthenticated()
  const router = useRouter()
  const [addresses, setAddresses] = useState<any[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in?redirect=/shipping")
    }
  }, [isAuthenticated, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Call API to save shipping address
    setAddresses([...addresses, { id: Date.now(), ...values }])
    form.reset()
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-0 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Shipping Addresses
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Add New Address Form */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-03 p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-6">Add New Address</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter zip code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Address
              </Button>
            </form>
          </Form>
        </div>

        {/* Saved Addresses */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
          {addresses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-neutral-03 p-6 text-center">
              <p className="text-neutral-05">
                No saved addresses yet. Add one using the form.
              </p>
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white rounded-lg shadow-sm border border-neutral-03 p-6"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{address.fullName}</h3>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
                <p className="text-sm text-neutral-05 mb-1">{address.phone}</p>
                <p className="text-sm text-neutral-05">
                  {address.address}, {address.city}, {address.state}{" "}
                  {address.zipCode}
                </p>
                <p className="text-sm text-neutral-05">{address.country}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
