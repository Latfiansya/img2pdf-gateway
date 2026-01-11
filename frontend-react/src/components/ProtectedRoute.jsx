import { Navigate, Outlet } from "react-router-dom";

// fungsi untuk melindungi route yang membutuhkan autentikasi
export default function ProtectedRoute() {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/login" replace />;
}
