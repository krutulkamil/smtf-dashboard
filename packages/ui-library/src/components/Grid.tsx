import * as React from 'react';
import { cn } from '../lib/cn';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number;
  mdCols?: number;
  lgCols?: number;
  gap?: number;
}

export function Grid({ className, cols = 1, mdCols = 2, lgCols = 4, gap = 4, ...props }: GridProps) {
  const grid = `grid grid-cols-${cols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols} gap-${gap}`;

  return <div className={cn(grid, className)} {...props} />;
}
