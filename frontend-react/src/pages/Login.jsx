import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if (!identifier || !password) return alert("Isi semua data");
        
        try {
        const res = await api.post("/auth/login", { identifier, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        } catch (err) {
        alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
        {/* KIRI: Visual Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-indigo-900 justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-900 opacity-90"></div>
            <div className="relative z-10 text-center text-white p-12">
            <h1 className="text-5xl font-extrabold mb-4">IMG2PDF</h1>
            <p className="text-xl text-indigo-200">Gateway Konversi Dokumen Tercepat.</p>
            </div>
        </div>

        {/* KANAN: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900">Selamat Datang Kembali</h2>
                <p className="mt-2 text-gray-600">Masuk untuk mengakses workspace Anda.</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={submit}>
                <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Email / Username</label>
                    <input 
                    type="text" 
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="name@example.com"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                    <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                    />
                </div>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30">
                Masuk Sekarang
                </button>
            </form>

            <p className="text-center text-sm text-gray-600">
                Belum punya akun? <span onClick={() => navigate("/register")} className="text-indigo-600 font-bold cursor-pointer hover:underline">Daftar disini</span>
            </p>
            </div>
        </div>
        </div>
    );
}