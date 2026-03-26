import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/actions/register-user";

type RegisterPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-md hover:-translate-y-0.5">
        <div className="mb-6 space-y-2">
          <p className="inline-flex rounded-full border border-fuchsia-200 bg-fuchsia-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fuchsia-700">
            Register
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Create account
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Join now to access your private dashboard.
          </p>
        </div>

        {error === "missing_fields" && (
          <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50/90 px-3 py-2 text-sm text-rose-700">
            Email and password are required.
          </p>
        )}
        {error === "password_too_short" && (
          <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50/90 px-3 py-2 text-sm text-rose-700">
            Password must be at least 6 characters.
          </p>
        )}
        {error === "user_exists" && (
          <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50/90 px-3 py-2 text-sm text-rose-700">
            User with this email already exists.
          </p>
        )}

        <form action={registerUser} className="space-y-4">
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password (min 6 characters)" required />
          <Button type="submit">Create account</Button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-2 transition duration-300 hover:text-violet-600"
          >
            Login
          </Link>
        </p>
      </Card>
    </main>
  );
}
