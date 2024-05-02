import { Skeleton } from './ui/skeleton';

export default function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Skeleton className="w-full h-52" />
      <Skeleton className="w-full h-52" />
      <Skeleton className="w-full h-52" />
    </div>
  );
}
