import { supabase } from "@/supabase/supabase";
import { toast } from "react-toastify";

export async function logInUser() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://frontend-masters-v1eh.vercel.app/",
      },
    });
    if (error) console.error("OAuth error:", error.message);
    return { data, error };
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

export async function InsertUser(
  username: string,
  image: string,
  name: string
) {
  try {
    const { error } = await supabase.from("users").insert([
      {
        username: username,
        name: name,
        image: image,
      },
    ]);
    if (error) {
      toast.error("Error inserting user");
    }
  } catch (err) {
    toast.error("Something went wrong");
  }
}
