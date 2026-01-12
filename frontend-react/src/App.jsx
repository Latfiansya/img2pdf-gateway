import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // Ini sekarang workspace utama
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        {/* Dashboard adalah pusat segalanya sekarang */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      
      {/* Route lama /convert dan /apikey bisa dihapus atau direirect ke /dashboard jika mau */}
    </Routes>
  );
}