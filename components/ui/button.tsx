import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-slate-900 text-slate-50 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:from-green-500 dark:hover:to-green-800',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-800 dark:bg-red-900 dark:text-slate-50 dark:hover:from-green-500 dark:hover:to-green-800',
        outline:
          'border border-slate-200 bg-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-800 hover:text-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:from-green-500 dark:hover:to-green-800',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-800 dark:bg-slate-800 dark:text-slate-50 dark:hover:from-green-500 dark:hover:to-green-800',
        ghost:
          'hover:bg-gradient-to-r hover:from-green-500 hover:to-green-800 hover:text-slate-50 dark:hover:from-green-500 dark:hover:to-green-800',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50 hover:text-green-600',
      }
    ,
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
