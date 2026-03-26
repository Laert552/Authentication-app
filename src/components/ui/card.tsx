import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-violet-500/10 backdrop-blur-md transition duration-300 sm:p-8 ${className}`}
    >
      {children}
    </section>
  );
}
