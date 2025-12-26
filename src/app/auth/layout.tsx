import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Expense Tracker",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md px-6">{children}</div>
    </div>
  );
}
