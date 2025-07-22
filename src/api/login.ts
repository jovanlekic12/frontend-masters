import { supabase } from "@/supabase/supabase";

export async function logInUser() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {},
    });
    console.log(data);
    if (error) console.error("OAuth error:", error.message);
    return { data, error };
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}
