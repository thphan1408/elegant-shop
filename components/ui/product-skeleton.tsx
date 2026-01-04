"use client"

export function ProductSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex items-start gap-6 2xl:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="lg:w-[calc(25%-1.125rem)] 2xl:w-[calc(25%-1.5rem)] flex flex-col shrink-0 animate-pulse"
        >
          <div className="flex flex-col justify-center items-start shrink-0 gap-3">
            <div className="relative overflow-hidden w-full bg-neutral-02 rounded-lg aspect-square" />
            <div className="flex flex-col items-start self-stretch gap-1 w-full">
              <div className="h-4 bg-neutral-02 rounded w-3/4 mb-2" />
              <div className="h-6 bg-neutral-02 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

