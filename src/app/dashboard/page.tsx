import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

async function logoutUser() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-xl hover:-translate-y-0.5">
        <p className="mb-4 inline-flex rounded-full border border-cyan-200 bg-cyan-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
          Welcome
        </p>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Dashboard</h1>
        <p className="mb-6 text-sm leading-relaxed text-slate-600 sm:text-base">
          Signed in as:{" "}
          <span className="rounded-md bg-violet-50 px-2 py-1 font-semibold text-violet-700">
            {session.user.email}
          </span>
        </p>

        <form action={logoutUser}>
          <Button type="submit" className="w-auto px-5" variant="secondary">
            Logout
          </Button>
        </form>
      </Card>
    </main>
  );
}
