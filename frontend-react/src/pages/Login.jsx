import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        if (!identifier || !password)
        return alert("Semua field wajib diisi.");

        try {
        const res = await api.post("/auth/login", { identifier, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        } catch (err) {
        alert(err.response?.data?.message || "Login gagal.");
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-900">
            <div className="text-center text-white p-12">
            <h1 className="text-5xl font-extrabold mb-4">IMG2PDF</h1>
            <p className="text-indigo-200 text-xl">Gateway Konversi Dokumen</p>
            </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-6">

            <button onClick={() => navigate("/")} className="text-indigo-500 text-sm">
                ← Back to Home
            </button>

            <div>
                <h2 className="text-3xl font-bold text-white">Login</h2>
                <p className="text-gray-400">Masuk ke akun Anda</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email / Username"
                className="w-full px-4 py-3 bg-white text-black border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white text-black border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold">
                Login
                </button>
            </form>

            <p className="text-gray-400 text-sm text-center">
                Belum punya akun?{" "}
                <span onClick={() => navigate("/register")} className="text-cyan-400 cursor-pointer">
                Register
                </span>
            </p>
            </div>
        </div>
        </div>
    );
}
