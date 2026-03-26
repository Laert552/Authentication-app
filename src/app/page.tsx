import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-md hover:-translate-y-0.5">
        <p className="mb-4 inline-flex rounded-full border border-violet-200 bg-violet-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
          Auth App
        </p>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome
        </h1>
        <p className="mb-7 text-sm leading-relaxed text-slate-600">
          A clean and secure place to create your account and sign in.
        </p>
        <div className="space-y-3">
          <Link
            href="/register"
            className="block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition duration-300 hover:scale-[1.01] hover:from-violet-500 hover:to-fuchsia-500"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="block rounded-xl border border-white/60 bg-white/80 px-4 py-2.5 text-center text-sm font-semibold text-slate-800 shadow-md shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Login
          </Link>
        </div>
      </Card>
    </main>
  );
}
