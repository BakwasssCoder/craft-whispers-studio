import { Skeleton } from '@/components/ui/skeleton';

export function HeroSkeleton() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-muted">
      <div className="absolute inset-0">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="relative z-10 text-center px-4 space-y-6">
        <Skeleton className="h-16 w-80 mx-auto" />
        <Skeleton className="h-8 w-96 mx-auto" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </section>
  );
}
