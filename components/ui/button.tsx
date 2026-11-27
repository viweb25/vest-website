import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-none text-xs sm:text-sm font-bold uppercase tracking-[0.12em] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border-1.5 border-[#0B2340] bg-transparent text-[#0B2340] hover:bg-transparent hover:border-[#E7651A] hover:text-[#E7651A]',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground hover:bg-transparent hover:text-destructive',
        outline:
          'border-1.5 border-[#0B2340] bg-transparent text-[#0B2340] hover:bg-transparent hover:border-[#E7651A] hover:text-[#E7651A]',
        secondary:
          'border-1.5 border-[#0B2340] bg-transparent text-[#0B2340] hover:bg-transparent hover:border-[#E7651A] hover:text-[#E7651A]',
        ghost: 'border-transparent hover:border-[#E7651A] hover:bg-transparent hover:text-[#E7651A]',
        link: 'border-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-3',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-13 px-8 text-sm',
        icon: 'h-10 w-10',
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
