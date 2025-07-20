import {Skeleton} from '@/components/ui/skeleton';
import {Card} from '@/components/ui/card';
import {cn} from '@/lib/utils';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  showFilters?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export function TableLoadingSkeleton({
                                       rows = 8,
                                       columns = 5,
                                       showHeader = true,
                                       showSearch = true,
                                       showPagination = true,
                                       showFilters = false,
                                       variant = 'default'
                                     }: TableSkeletonProps) {
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      {showHeader && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64 bg-gradient-to-r from-muted via-muted/50 to-muted"/>
              <Skeleton className="h-4 w-96 bg-gradient-to-r from-muted via-muted/30 to-muted"/>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full"/>
              <Skeleton className="h-10 w-28 rounded-lg"/>
            </div>
          </div>

          {/* Search and Filters */}
          {(showSearch || showFilters) && (
            <div className="flex items-center gap-4">
              {showSearch && (
                <div className="relative flex-1 max-w-md">
                  <Skeleton className="h-11 w-full rounded-lg"/>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Skeleton className="h-4 w-4 rounded"/>
                  </div>
                </div>
              )}
              {showFilters && (
                <div className="flex items-center gap-2">
                  <Skeleton className="h-11 w-24 rounded-lg"/>
                  <Skeleton className="h-11 w-32 rounded-lg"/>
                  <Skeleton className="h-11 w-11 rounded-lg"/>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Table Container */}
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          {/* Table Header */}
          <div className="">
            <div
              className={cn(
                "grid gap-6 px-6 py-4",
                isCompact ? "py-3" : "py-4"
              )}
              style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}
            >
              {Array.from({length: columns}).map((_, index) => (
                <div key={`header-${index}`} className="flex items-center gap-2">
                  <Skeleton className={cn(
                    "bg-gradient-to-r from-muted via-muted/60 to-muted",
                    index === 0 ? "h-4 w-32" :
                      index === 1 ? "h-4 w-24" :
                        index === 2 ? "h-4 w-28" :
                          index === 3 ? "h-4 w-20" : "h-4 w-16"
                  )}/>
                  {index < 2 && <Skeleton className="h-3 w-3 rounded"/>}
                </div>
              ))}
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border/50">
            {Array.from({length: rows}).map((_, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={cn(
                  "grid gap-6 px-6 transition-all duration-200 hover:bg-muted/20",
                  isCompact ? "py-3" : "py-4"
                )}
                style={{
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  animationDelay: `${rowIndex * 50}ms`
                }}
              >
                {Array.from({length: columns}).map((_, colIndex) => {
                  const getSkeletonProps = () => {
                    if (colIndex === 0) {
                      // First column - primary content
                      return {
                        className: "h-5 w-full bg-gradient-to-r from-muted via-muted/70 to-muted",
                        style: {animationDelay: `${(rowIndex * columns + colIndex) * 100}ms`}
                      };
                    } else if (colIndex === 1) {
                      // Second column - secondary content
                      return {
                        className: "h-4 w-4/5 bg-gradient-to-r from-muted/80 via-muted/50 to-muted/80",
                        style: {animationDelay: `${(rowIndex * columns + colIndex) * 100}ms`}
                      };
                    } else if (colIndex === columns - 1) {
                      // Last column - actions/status
                      return {
                        className: "h-6 w-16 rounded-full bg-gradient-to-r from-muted/60 via-muted/40 to-muted/60",
                        style: {animationDelay: `${(rowIndex * columns + colIndex) * 100}ms`}
                      };
                    } else {
                      // Middle columns - varied content
                      const widths = ['w-3/5', 'w-2/3', 'w-1/2', 'w-3/4'];
                      const heights = ['h-4', 'h-4', 'h-4'];
                      return {
                        className: `${heights[colIndex % heights.length]} ${widths[colIndex % widths.length]} bg-gradient-to-r from-muted/70 via-muted/40 to-muted/70`,
                        style: {animationDelay: `${(rowIndex * columns + colIndex) * 100}ms`}
                      };
                    }
                  };

                  const skeletonProps = getSkeletonProps();

                  return (
                    <div key={`cell-${rowIndex}-${colIndex}`} className="flex items-center">
                      {colIndex === 0 && isDetailed && (
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full bg-gradient-to-br from-muted to-muted/60"/>
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-32 bg-gradient-to-r from-muted via-muted/70 to-muted"/>
                            <Skeleton className="h-3 w-24 bg-gradient-to-r from-muted/60 via-muted/30 to-muted/60"/>
                          </div>
                        </div>
                      )}
                      {(colIndex !== 0 || !isDetailed) && (
                        <Skeleton {...skeletonProps} />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {showPagination && (
          <div
            className="flex items-center justify-between border-t bg-gradient-to-r from-muted/10 via-transparent to-muted/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 bg-gradient-to-r from-muted via-muted/60 to-muted"/>
              <Skeleton className="h-4 w-16 bg-gradient-to-r from-muted/70 via-muted/40 to-muted/70"/>
              <Skeleton className="h-4 w-12 bg-gradient-to-r from-muted/60 via-muted/30 to-muted/60"/>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-lg"/>
              <Skeleton className="h-9 w-9 rounded-lg"/>
              <div className="mx-2">
                <Skeleton className="h-4 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted"/>
              </div>
              <Skeleton className="h-9 w-9 rounded-lg"/>
              <Skeleton className="h-9 w-9 rounded-lg"/>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}