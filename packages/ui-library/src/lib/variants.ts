import { cva, type VariantProps } from 'class-variance-authority';

export const surfaceVariants = cva('card p-4 md:p-6', {
  variants: {
    tone: {
      neutral: '',
      positive: 'border-success/40',
      warning: 'border-warning/40',
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
});

export type SurfaceVariants = VariantProps<typeof surfaceVariants>;
