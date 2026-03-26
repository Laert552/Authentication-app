"use client";

import { useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordInput({
  className = "",
  id,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="relative">
      <Input
        id={inputId}
        type={isVisible ? "text" : "password"}
        className={`pr-11 ${className}`}
        {...props}
      />
      <button
        type="button"
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-controls={inputId}
        aria-pressed={isVisible}
        onClick={() => setIsVisible((current) => !current)}
        className="absolute inset-y-0 right-0 inline-flex items-center justify-center rounded-r-xl px-3 text-slate-500 transition duration-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200"
      >
        {isVisible ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M10.58 10.58a2 2 0 102.83 2.83"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.88 4.24A11 11 0 0121 12a11.47 11.47 0 01-3.24 4.78M6.24 6.24A11.54 11.54 0 003 12a11 11 0 006.76 7.76A11.7 11.7 0 0012 20c1.38 0 2.71-.25 3.95-.71"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path
              d="M2.04 12.32a1 1 0 010-.64C3.42 7.51 7.36 4.5 12 4.5s8.58 3.01 9.96 7.18a1 1 0 010 .64C20.58 16.49 16.64 19.5 12 19.5S3.42 16.49 2.04 12.32z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
