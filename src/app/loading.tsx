export default function Loading() {
  return (
    <main className="py-10 max-w-xl mx-auto px-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2"></div>
      </div>
    </main>
  )
}