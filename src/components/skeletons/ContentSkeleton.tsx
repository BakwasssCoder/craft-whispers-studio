import { Skeleton } from '@/components/ui/skeleton';

export function ContentSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-64 mx-auto" />
      <Skeleton className="h-6 w-48 mx-auto" />
      <div className="space-y-4 mt-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
