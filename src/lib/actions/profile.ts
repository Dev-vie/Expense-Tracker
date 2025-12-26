"use server";

import { createClient } from "@/lib/supabaseServer";
import { getUser } from "@/lib/auth";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
}

export async function createUserProfile(
  userId: string,
  username: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    
    // Use the server client which has elevated permissions
    const { error } = await (supabase
      .from("profiles")
      .insert({
        id: userId,
        username: username.trim(),
        email: email,
      } as any)) as any;

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const user = await getUser();
    if (!user) return null;

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, email")
      .eq("id", user.id)
      .single();

    if (error || !data) {
      // Fallback to email if profile doesn't exist
      return {
        id: user.id,
        username: user.email?.split("@")[0] || "User",
        email: user.email || "",
      };
    }

    return data;
  } catch (error) {
    return null;
  }
}
