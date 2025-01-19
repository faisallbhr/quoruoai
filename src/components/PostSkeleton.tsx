import { Skeleton } from "./ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="divide-y-2 space-y-4">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="pt-4">
          <Skeleton className="h-7 w-40" />
          <div className="pt-2 pb-2 space-y-1">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[96%]" />
            <Skeleton className="h-6 w-[70%]" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-[15%]" />
            <Skeleton className="h-6 w-[15%]" />
            <Skeleton className="h-6 w-[15%]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSkeleton;
