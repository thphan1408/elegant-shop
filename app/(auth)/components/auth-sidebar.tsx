import Link from "next/link"

export default function AuthSidebar() {
  return (
    <div className="bg-neutral-03 p-8 md:p-4 gap-8 lg:p-8 flex flex-col">
      <div className="text-center">
        <Link href="/" className="no-underline text-primary-1 text-heading-8">
          3legant
          <span className="text-neutral-04 text-heading-8">.</span>
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-0">
        {/* Mobile image */}
        <img
          src="/img/auth-bg-mobile.png"
          alt="bg-auth"
          className="mix-blend-darken object-contain md:hidden"
        />
        {/* Desktop image */}
        <img
          src="/img/auth-bg.png"
          alt="bg-auth"
          className="mix-blend-darken max-w-[68%] object-contain hidden md:block"
        />
      </div>
    </div>
  )
}
