import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if (form.password.length < 6) return alert("Password min 6 karakter");

        try {
        await api.post("/auth/register", form);
        alert("Registrasi sukses! Silakan login.");
        navigate("/login");
        } catch (err) {
        alert(err.response?.data?.message || "Register failed");
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
        {/* KIRI: Visual Branding (Sama tapi variasi warna dikit boleh) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-900 justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-black opacity-90"></div>
            <div className="relative z-10 text-center text-white p-12">
            <h1 className="text-5xl font-extrabold mb-4">Bergabunglah</h1>
            <p className="text-xl text-gray-400">Mulai manajemen dokumen digital Anda hari ini.</p>
            </div>
        </div>

        {/* KANAN: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h2>
                <p className="mt-2 text-gray-600">Gratis dan proses cepat.</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={submit}>
                <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Username"
                    onChange={e => setForm({...form, username: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 outline-none"
                />
                <input 
                    type="email" 
                    placeholder="Email Address"
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 outline-none"
                />
                <input 
                    type="password" 
                    placeholder="Password (Min 6 char)"
                    onChange={e => setForm({...form, password: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 outline-none"
                />
                </div>

                <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition shadow-lg">
                Daftar Akun
                </button>
            </form>

            <p className="text-center text-sm text-gray-600">
                Sudah punya akun? <span onClick={() => navigate("/login")} className="text-gray-900 font-bold cursor-pointer hover:underline">Login disini</span>
            </p>
            </div>
        </div>
        </div>
    );
}