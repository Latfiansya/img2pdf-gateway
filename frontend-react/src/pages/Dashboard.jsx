import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const logout = async () => {
        try {
        await api.post("/auth/logout");   // ⬅ TOKEN otomatis dikirim di header
        localStorage.removeItem("token");
        navigate("/login");
        } catch (err) {
        alert(err.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div style={{ padding: 40 }}>
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
        </div>
    );
}
