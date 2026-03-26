import Link from "next/link";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

async function loginUser(formData: FormData) {
  "use server";

  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString().trim();

  if (!email || !password) {
    redirect("/login?error=missing_fields");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=invalid_credentials");
    }

    throw error;
  }
}

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-md hover:-translate-y-0.5">
        <div className="mb-6 space-y-2">
          <p className="inline-flex rounded-full border border-violet-200 bg-violet-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
            Login
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome back
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Sign in to continue to your dashboard.
          </p>
        </div>

        {error === "missing_fields" && (
          <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50/90 px-3 py-2 text-sm text-rose-700">
            Email and password are required.
          </p>
        )}
        {error === "invalid_credentials" && (
          <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50/90 px-3 py-2 text-sm text-rose-700">
            Invalid email or password.
          </p>
        )}

        <form action={loginUser} className="space-y-4">
          <Input name="email" type="email" placeholder="Email" required />
          <PasswordInput name="password" placeholder="Password" required />
          <Button type="submit">Login</Button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-2 transition duration-300 hover:text-violet-600"
          >
            Register
          </Link>
        </p>
      </Card>
    </main>
  );
}
