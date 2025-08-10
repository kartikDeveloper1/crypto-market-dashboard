import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CryptoDetail from "../pages/CryptoDetail";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CryptoDetail />} />
      </Routes>
  );
}
