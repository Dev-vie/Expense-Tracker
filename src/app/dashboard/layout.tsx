import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { getUserProfile } from "@/lib/actions/profile";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Dashboard | Expense Tracker",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const profile = await getUserProfile();

  return (
    <div className="min-h-screen bg-black">
      <Header profile={profile} />
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
