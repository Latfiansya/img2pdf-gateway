import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.email || !form.password)
        return alert("Semua field wajib diisi.");

        if (!form.email.includes("@") || !form.email.includes("."))
        return alert("Format email tidak valid.");

        if (form.password.length < 6)
        return alert("Password minimal 6 karakter.");

        try {
        await api.post("/auth/register", form);
        alert("Registrasi berhasil, silakan login.");
        navigate("/login");
        } catch (err) {
        alert(err.response?.data?.message || "Registrasi gagal.");
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-900">
            <div className="text-center text-white p-12">
            <h1 className="text-5xl font-extrabold mb-4">IMG2PDF</h1>
            <p className="text-indigo-200 text-xl">Buat akun baru</p>
            </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-6">

            <button onClick={() => navigate("/")} className="text-indigo-500 text-sm">
                ← Back to Home
            </button>

            <div>
                <h2 className="text-3xl font-bold text-white">Register</h2>
                <p className="text-gray-400">Buat akun baru</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <input
                placeholder="Username"
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="w-full px-4 py-3 bg-white text-black border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                placeholder="Email"
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-white text-black border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                type="password"
                placeholder="Password (min 6 karakter)"
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 bg-white text-black border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold">
                Register
                </button>
            </form>

            <p className="text-gray-400 text-sm text-center">
                Sudah punya akun?{" "}
                <span onClick={() => navigate("/login")} className="text-cyan-400 cursor-pointer">
                Login
                </span>
            </p>
            </div>
        </div>
        </div>
    );
}
