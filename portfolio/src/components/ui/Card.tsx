import React from 'react';
import { cn } from './Button';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow-sm backdrop-blur-sm transition-all hover:shadow-md',
        'dark:bg-white/5 dark:border-white/10',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';
