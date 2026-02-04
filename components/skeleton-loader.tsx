export const SkeletonLoader = () => {
  return (
    <div className="flex flex-col h-full gap-2 p-2 animate-pulse">
      {/* Positive skeleton */}
      <div className="bg-green-100 p-4 flex items-center justify-center min-h-[120px] rounded">
        <div className="space-y-2 w-full">
          <div className="h-3 bg-green-300 rounded w-3/4 mx-auto"></div>
          <div className="h-3 bg-green-300 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
      
      {/* Negative skeleton */}
      <div className="bg-red-100 p-4 flex items-center justify-center min-h-[120px] rounded">
        <div className="space-y-2 w-full">
          <div className="h-3 bg-red-300 rounded w-3/4 mx-auto"></div>
          <div className="h-3 bg-red-300 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
      
      {/* Question skeleton */}
      <div className="bg-yellow-100 p-4 flex items-center justify-center min-h-[120px] rounded">
        <div className="space-y-2 w-full">
          <div className="h-3 bg-yellow-300 rounded w-3/4 mx-auto"></div>
          <div className="h-3 bg-yellow-300 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};
