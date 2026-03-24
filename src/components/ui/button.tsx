"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-ocean text-white hover:bg-ocean-dark shadow-md hover:shadow-lg":
              variant === "primary",
            "bg-navy text-white hover:bg-navy-light shadow-md hover:shadow-lg":
              variant === "secondary",
            "border-2 border-navy text-navy hover:bg-navy hover:text-white":
              variant === "outline",
            "text-navy hover:bg-slate-100": variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
