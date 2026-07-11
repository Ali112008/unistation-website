export default function TeamMemberLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative pt-32 pb-20 bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-5 w-40 bg-white/10 rounded animate-pulse mb-6" />
          <div className="h-12 w-72 bg-white/10 rounded animate-pulse" />
          <div className="h-6 w-48 bg-white/10 rounded animate-pulse mt-4" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Photo skeleton */}
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-[460px] bg-gray-200 animate-pulse" />

            {/* Info skeleton */}
            <div className="md:col-span-2">
              <div className="h-1 w-20 bg-gray-200 rounded mb-6" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-11/12" />
                <div className="h-4 bg-gray-100 rounded w-10/12" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-9/12" />
                <div className="h-4 bg-gray-100 rounded w-11/12" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}