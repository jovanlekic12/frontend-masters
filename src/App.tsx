import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "@/pages/home/Index";
import { useEffect, useState } from "react";
import { Token } from "./utils/types";
import { supabase } from "./supabase/supabase";
import Feedback from "./pages/feedback/Index";

function App() {
  const [token, setToken] = useState<Token | null>(null);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home setToken={setToken} token={token} />} />
        <Route path="product/:id" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
