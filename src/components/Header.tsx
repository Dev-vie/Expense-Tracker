"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import { useState } from "react";
import { Wallet, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/lib/actions/profile";

export default function Header({ profile }: { profile: UserProfile | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    router.push("/auth/login");
  };

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-black dark:text-white" />
          <h1 className="text-2xl font-semibold text-black dark:text-white tracking-tight">
            Expense Tracker
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-sm font-medium text-black dark:text-white">
              {profile?.username || "User"}
            </span>
          </div>
          <Button onClick={handleLogout} disabled={loading} className="gap-2">
            {loading ? (
              "Logging out..."
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
