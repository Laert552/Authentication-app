import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-white/50 bg-white/80 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-md shadow-slate-900/5 backdrop-blur-sm transition duration-300 focus:border-violet-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 ${className}`}
      {...props}
    />
  );
}
