"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost" | "paper" | "seal";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[4px] font-serif text-base transition duration-200 outline-offset-4 focus:outline focus:outline-2 focus:outline-gilt disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  default:
    "border border-[#8f6427] bg-[#9f7330] text-[#fff8e8] shadow-folio hover:bg-[#865b21]",
  outline:
    "border border-gilt/55 bg-[#fff8e8] text-umber shadow-etching hover:bg-white hover:text-ink",
  ghost:
    "border border-transparent bg-transparent text-umber hover:border-gilt/30 hover:bg-[#fff8e8]/70 hover:text-ink",
  paper:
    "border border-gilt/30 bg-[#fffaf0]/80 text-ink shadow-etching hover:bg-[#fff8e8]",
  seal:
    "border border-rosewood/50 bg-rosewood text-[#fff8e8] shadow-folio hover:bg-[#64342e]"
};

const sizes: Record<ButtonSize, string> = {
  default: "min-h-12 px-6 py-3",
  sm: "min-h-10 px-4 py-2 text-sm",
  lg: "min-h-14 px-7 py-4 text-lg",
  icon: "h-11 w-11 p-0"
};

export function buttonVariants({
  variant = "default",
  size = "default",
  className
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={buttonVariants({ variant, size, className })}
    {...props}
  />
));

Button.displayName = "Button";
