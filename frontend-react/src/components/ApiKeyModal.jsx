import { useState, useEffect } from "react";
import { generateApiKeyService } from "../services/api";

export default function ApiKeyModal({ isOpen, onClose }) {
    const [keys, setKeys] = useState({ publicKey: "", privateKey: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Load key saat modal dibuka
    useEffect(() => {
        if (isOpen) {
        const savedPublic = localStorage.getItem("x-public-key");
        const savedPrivate = localStorage.getItem("x-private-key");
        if (savedPublic && savedPrivate) {
            setKeys({ publicKey: savedPublic, privateKey: savedPrivate });
        }
        }
    }, [isOpen]);

    const handleGenerate = async () => {
        if (keys.publicKey && !confirm("Generate baru akan menghanguskan key lama. Lanjutkan?")) return;
        
        setLoading(true);
        setMessage("");
        try {
        const res = await generateApiKeyService();
        const { publicKey, privateKey } = res.data;

        setKeys({ publicKey, privateKey });
        localStorage.setItem("x-public-key", publicKey);
        localStorage.setItem("x-private-key", privateKey);
        
        setMessage("API Key berhasil diperbarui!");
        } catch (err) {
        setMessage("Gagal: " + (err.response?.data?.message || err.message));
        } finally {
        setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative animate-fade-in-up">
            <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
            ✕
            </button>

            <h2 className="text-xl font-bold mb-1 text-gray-800">Manajemen API Key</h2>
            <p className="text-sm text-gray-500 mb-6">Key ini diperlukan untuk otorisasi konversi.</p>

            {message && (
            <div className={`p-3 mb-4 rounded text-sm ${message.includes("Gagal") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                {message}
            </div>
            )}

            <div className="space-y-4 mb-6">
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Public Key</label>
                <div className="bg-gray-100 p-3 rounded border font-mono text-xs break-all text-gray-700">
                {keys.publicKey || "Belum ada key"}
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Private Key</label>
                <div className="bg-gray-100 p-3 rounded border font-mono text-xs break-all text-gray-700">
                {keys.privateKey || "Belum ada key"}
                </div>
            </div>
            </div>

            <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition font-medium"
            >
            {loading ? "Sedang Membuat..." : (keys.publicKey ? "Generate Ulang Key" : "Buat API Key")}
            </button>
        </div>
        </div>
    );
}