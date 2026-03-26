"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { useFormStatus } from "react-dom";

type ButtonVariant = "primary" | "secondary";

type AsyncClickHandler = (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  variant?: ButtonVariant;
  onClick?: AsyncClickHandler;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 hover:scale-[1.01] hover:from-violet-500 hover:to-fuchsia-500 focus-visible:ring-violet-300",
  secondary:
    "border border-white/60 bg-white/80 text-slate-800 shadow-md shadow-slate-900/5 backdrop-blur hover:bg-white focus-visible:ring-slate-300",
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();
  const [isClickLoading, setIsClickLoading] = useState(false);
  const isLoading = pending || isClickLoading;

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (!onClick) return;

    const result = onClick(event);
    if (result instanceof Promise) {
      setIsClickLoading(true);
      try {
        await result;
      } finally {
        setIsClickLoading(false);
      }
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
