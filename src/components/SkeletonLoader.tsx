export default function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {/* Main card skeleton */}
      <div className="glass p-6 space-y-4">
        <div className="skeleton h-6 w-32 rounded-lg" />
        <div className="skeleton h-16 w-48 rounded-xl" />
        <div className="skeleton h-4 w-24 rounded-lg" />
        <div className="flex gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton h-12 flex-1 rounded-xl" />
          ))}
        </div>
      </div>
      {/* Row skeletons */}
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="glass p-4 space-y-2">
            <div className="skeleton h-4 w-16 rounded" />
            <div className="skeleton h-8 w-12 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
