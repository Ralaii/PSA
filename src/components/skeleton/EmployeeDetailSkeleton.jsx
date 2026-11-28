import Card from "../ui/Card";
import { Skeleton } from "@/components/ui/skeleton";

export function EmployeeDetailSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading employee">
      {/* Header */}
      <Card className="flex items-center gap-4 p-6">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </Card>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        {/* Details card */}
        <Card className="space-y-4 p-6">
          <Skeleton className="h-5 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </Card>

        {/* Projects card */}
        <Card className="space-y-3 p-6">
          <Skeleton className="h-5 w-32" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </Card>
      </div>
    </div>
  );
}