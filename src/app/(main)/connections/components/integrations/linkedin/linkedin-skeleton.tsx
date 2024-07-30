import { Skeleton } from "@/components/ui/skeleton";

const LinkedinSkeleton = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-1 w-[] h-44 border border-gray-200 rounded-md p-4">
      <Skeleton className="h-32 w-32 rounded-full bg-gray-200" />
      <div className="flex flex-col justify-between">
        <Skeleton className="h-4 w-[50%] bg-gray-200" />
        <Skeleton className="h-3 w-[75%] bg-gray-200" />
        <Skeleton className="h-3 w-[70%] bg-gray-200" />
        <Skeleton className="h-6 w-[60%] bg-gray-200" />
      </div>
    </div>
  );
};

export default LinkedinSkeleton;
