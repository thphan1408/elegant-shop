"use client"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function NewsletterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Handle newsletter subscription
    console.log(values)
  }

  return (
    <section className="relative overflow-hidden bg-[#F2F4F6] -mx-8 lg:-mx-40 h-[360px] lg:h-[400px] flex justify-center items-center">
      <img
        src="/img/section_2.png"
        alt=""
        className="hidden lg:block absolute top-[-45px] left-[-520px] h-[500px] w-auto mix-blend-darken"
      />
      <img
        src="/img/auth-bg.png"
        alt=""
        className="hidden lg:block absolute bottom-[-177px] right-[-200px] h-[850px] w-auto object-right mix-blend-darken"
      />

      <div className="flex flex-col justify-center items-center gap-8 py-20 lg:py-0 z-10">
        <div className="flex flex-col justify-center items-center gap-2 text-center">
          <p className="text-neutral-07 text-[1.75rem] font-medium leading-8.5 tracking-[-0.0375rem] lg:text-[2.5rem] lg:leading-11 lg:tracking-[-0.025rem]">
            Join Our Newsletter
          </p>
          <p className="text-neutral-07 text-[0.875rem] font-normal leading-5.5 lg:text-[1.125rem] lg:leading-7.5">
            Sign up for deals, new products and promotions
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center w-[400px] lg:w-[500px] border-b border-neutral-04/50 pb-2"
          >
            <Image
              src="/svg/email.svg"
              width={24}
              height={24}
              alt="Email"
              className="text-neutral-04 shrink-0"
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="bg-transparent border-0 outline-none shadow-none px-4 py-2 text-base font-medium leading-7 tracking-[-0.025rem] text-neutral-07 placeholder:text-neutral-04"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="ghost"
              className="text-neutral-04 text-base font-medium hover:text-neutral-07 hover:bg-transparent transition-colors shrink-0 p-0"
            >
              Signup
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
