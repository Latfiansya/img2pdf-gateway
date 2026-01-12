import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { convertPdfService } from "../services/api";
import Navbar from "../components/Navbar";
import ApiKeyModal from "../components/ApiKeyModal";

export default function Dashboard() {
    const navigate = useNavigate();
    
    // State Workspace
    const [files, setFiles] = useState([]);
    const [useCover, setUseCover] = useState(false);
    const [meta, setMeta] = useState({ title: "", author: "" });
    const [layout, setLayout] = useState("single");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
 
    // State Modal
    const [isKeyModalOpen, setKeyModalOpen] = useState(false);

    // Cek Key saat masuk, jika tidak ada, tawarkan buat key
    useEffect(() => {
        const pub = localStorage.getItem("x-public-key");
        if (!pub) {
        // Auto open modal jika user belum punya key
        setTimeout(() => setKeyModalOpen(true), 500); 
        }
    }, []);

    // --- LOGIC: Logout (Dari Dashboard lama) ---
    const handleLogout = async () => {
        try {
        await api.post("/auth/logout");
        localStorage.removeItem("token");
        navigate("/login");
        } catch (err) {
        console.error("Logout failed", err);
        localStorage.removeItem("token");
        navigate("/login");
        }
    };

    // --- LOGIC: File Handling (Dari Convert.jsx) ---
    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files);
        if (selected.some(f => !f.type.startsWith("image/"))) {
        setError("Mohon hanya upload file gambar.");
        return;
        }
        setError("");
        setFiles(prev => [...prev, ...selected]);
        e.target.value = null;
    };

    const handleRemoveFile = (indexToRemove) => {
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async () => {
        if (files.length === 0) return setError("Pilih minimal 1 gambar.");
        if (useCover && (!meta.title || !meta.author)) return setError("Judul dan Penulis wajib diisi untuk Cover.");

        setLoading(true);
        setError("");

        try {
        const formData = new FormData();
        files.forEach(file => formData.append("images", file));
        
        formData.append("useCover", useCover);
        if (useCover) {
            formData.append("title", meta.title);
            formData.append("author", meta.author);
        }
        
        const finalLayout = files.length === 1 ? "single" : layout;
        formData.append("layout", finalLayout);

        const pub = localStorage.getItem("x-public-key");
        const priv = localStorage.getItem("x-private-key");

        if (!pub || !priv) {
            setKeyModalOpen(true);
            throw new Error("API Key hilang. Silakan generate ulang di menu atas.");
        }

        const response = await convertPdfService(formData, pub, priv);

        // Download Logic
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        let fileName = "IMG2PDF-Export";
        if (useCover && meta.title) {
            const sanitizedTitle = meta.title.replace(/[^a-zA-Z0-9\-_ ]/g, "").trim();
            fileName = sanitizedTitle.replace(/\s+/g, "_");
        }
        const dateStr = new Date().toISOString().split('T')[0];
        link.setAttribute("download", `${fileName}_${dateStr}.pdf`);
        
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        // Opsional: Clear files setelah sukses?
        // setFiles([]); 
        } catch (err) {
        console.error(err);
        setError(err.message || "Gagal konversi. Cek API Key atau ukuran file.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar onOpenApiKey={() => setKeyModalOpen(true)} onLogout={handleLogout} />
        
        <ApiKeyModal isOpen={isKeyModalOpen} onClose={() => setKeyModalOpen(false)} />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            
            {/* KIRI: Upload Area (Dominan) */}
            <div className="flex-1 p-8 border-r border-gray-100 flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Workspace</h1>
                <p className="text-gray-500 mb-6 text-sm">Upload gambar Anda, atur urutan, dan konversi.</p>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

                {/* Dropzone Area Visual */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center p-8 mb-6 hover:bg-indigo-50 hover:border-indigo-300 transition cursor-pointer relative group">
                    <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <p className="text-gray-600 font-medium">Klik untuk Upload atau Drag & Drop</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG supported</p>
                </div>

                {/* List Files */}
                <div className="flex-grow overflow-y-auto pr-2">
                {files.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm mt-10 italic">Belum ada file dipilih</div>
                ) : (
                    <ul className="space-y-2">
                    {files.map((file, idx) => (
                        <li key={idx} className="flex justify-between items-center bg-white border p-3 rounded-lg hover:shadow-sm transition">
                        <div className="flex items-center overflow-hidden">
                            <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 mr-3 shrink-0">{idx + 1}</span>
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        </div>
                        <button onClick={() => handleRemoveFile(idx)} className="text-red-400 hover:text-red-600 p-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            </div>

            {/* KANAN: Settings & Action (Sidebar) */}
            <div className="w-full md:w-80 bg-gray-50 p-6 flex flex-col justify-between">
                <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Pengaturan PDF</h3>
                
                {/* Cover Toggle */}
                <div>
                    <label className="flex items-center cursor-pointer mb-3">
                    <input type="checkbox" checked={useCover} onChange={e => setUseCover(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 relative"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">Cover Halaman</span>
                    </label>

                    {useCover && (
                    <div className="space-y-3 animate-fade-in-down pl-1">
                        <input type="text" placeholder="Judul Dokumen" value={meta.title} onChange={e => setMeta({...meta, title: e.target.value})} className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                        <input type="text" placeholder="Nama Penulis" value={meta.author} onChange={e => setMeta({...meta, author: e.target.value})} className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    </div>
                    )}
                </div>

                {/* Layout Options (Hanya muncul jika > 1 file) */}
                {files.length > 1 && (
                    <div className="bg-white p-3 rounded border">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Tata Letak</p>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setLayout("single")}
                            className={`flex-1 py-2 text-xs rounded border ${layout === "single" ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                        >
                            1 per Halaman
                        </button>
                        <button 
                            onClick={() => setLayout("quadrant")}
                            className={`flex-1 py-2 text-xs rounded border ${layout === "quadrant" ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                        >
                            4 per Halaman
                        </button>
                    </div>
                    </div>
                )}
                </div>

                {/* Action Button */}
                <div className="mt-8">
                <button
                    onClick={handleSubmit}
                    disabled={loading || files.length === 0}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transform transition active:scale-95 flex items-center justify-center ${
                    loading || files.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30"
                    }`}
                >
                    {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Memproses...
                    </>
                    ) : (
                    "EXPORT PDF SEKARANG"
                    )}
                </button>
                </div>
            </div>
            </div>
            
            <div className="mt-8 text-center text-gray-400 text-xs">
            &copy; 2026 IMG2PDF Gateway by Yikri. All rights reserved.
            </div>
        </main>
        </div>
    );
}