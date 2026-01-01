import { Skeleton } from '@/components/ui/skeleton';

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-2xl overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}
