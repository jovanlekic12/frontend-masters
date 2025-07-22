import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "@/pages/home/Index";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//buttone i cijeli UI folder sredit
//redux setUpovati, loadati paraleelno requestove na home page
//responsive odraditi odma
//infite schroll custom hook
