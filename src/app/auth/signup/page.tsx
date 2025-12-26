"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabaseClient";
import { createUserProfile } from "@/lib/actions/profile";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.trim(),
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Create profile entry using server action
      if (authData.user) {
        const result = await createUserProfile(
          authData.user.id,
          username.trim(),
          email
        );

        if (!result.success) {
          setError("Failed to create profile: " + result.error);
          return;
        }
      }

      // Check if email confirmation is required
      if (authData.session) {
        // User is already logged in, redirect to dashboard
        router.push("/dashboard");
      } else {
        // Email confirmation required
        router.push(
          "/auth/login?message=Check your email to confirm your account"
        );
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Create Account
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Start tracking your expenses today
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-zinc-300 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="johndoe"
            minLength={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-zinc-300 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-zinc-300 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-zinc-300 rounded-lg dark:bg-zinc-900 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center text-sm">
        <p className="text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-black dark:text-white hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
