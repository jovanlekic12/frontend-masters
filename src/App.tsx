import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "@/pages/home/Index";
import { useEffect, useState } from "react";
import { Token } from "./utils/types";
import { supabase } from "./supabase/supabase";
import Feedback from "./pages/feedback/Index";
import { InsertUser } from "./api/login";

function App() {
  const [token, setToken] = useState<Token | null>(null);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
      const setUser = async () => {
        const username = token.user.email.split("@")[0];
        const { data: existing, error } = await supabase
          .from("users")
          .select("*")
          .eq("username", token.user.user_metadata.name);

        if (existing) {
          return;
        } else {
          await InsertUser(
            username,
            token.user.user_metadata.avatar_url,
            token.user.user_metadata.full_name
          );
        }
      };
      setUser();
    }
  }, [token]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const tokenData: Token = {
          session: session,
          user: session.user,
        };
        setToken(tokenData);
        localStorage.setItem("supabase.session", JSON.stringify(session));
      } else {
        setToken(null);
        sessionStorage.removeItem("token");
        localStorage.removeItem("supabase.session");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home setToken={setToken} token={token} />} />
        <Route
          path="product/:id"
          element={<Feedback token={token} setToken={setToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
