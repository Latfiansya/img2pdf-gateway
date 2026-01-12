import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        
        {/* Header Sederhana */}
        <header className="container mx-auto px-6 py-6 flex justify-between items-center">
            <div className="text-2xl font-black text-indigo-600 tracking-tighter">IMG2PDF</div>
            <div className="space-x-4">
            <button onClick={() => navigate("/login")} className="text-gray-600 font-medium hover:text-indigo-600">Masuk</button>
            <button onClick={() => navigate("/register")} className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition shadow-md">Daftar Gratis</button>
            </div>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 mt-10 md:mt-20">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-6 uppercase">Versi 1.0 Live</span>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight max-w-4xl">
            Ubah Tumpukan Gambar <br className="hidden md:block" />
            Menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">PDF Profesional</span>
            </h1>
            
            <p className="text-lg text-gray-500 max-w-2xl mb-10 leading-relaxed">
            Platform konversi cerdas dengan kompresi otomatis dan manajemen layout.
            Tanpa instalasi, akses langsung dari browser Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
                onClick={() => navigate("/register")}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-indigo-700 hover:scale-105 transition transform focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                Mulai Sekarang &rarr;
            </button>

            <button onClick={() => navigate("/login")} className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
                Sudah Punya Akun?
            </button>
            </div>

            {/* Visual Mockup (Kotak bayangan sebagai placeholder UI) */}
            <div className="w-full max-w-5xl bg-white rounded-t-3xl shadow-2xl border border-gray-200 p-4 pb-0 overflow-hidden mx-auto">
            <div className="bg-gray-100 rounded-t-xl h-48 md:h-64 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-200">
                <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">Upload Gambar</h3>
                        <p className="text-sm text-gray-500">Pilih banyak foto sekaligus untuk dijadikan PDF.</p>
                    </div>
                    <div className="text-indigo-600 font-semibold text-sm mt-4">Multi Upload Ready</div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">Auto Cover Page</h3>
                        <p className="text-sm text-gray-500">Judul, penulis, dan tanggal otomatis.</p>
                    </div>
                    <div className="text-indigo-600 font-semibold text-sm mt-4">Smart Layout</div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">Kompresi Otomatis</h3>
                        <p className="text-sm text-gray-500">PDF kecil tapi kualitas tetap jernih.</p>
                    </div>
                    <div className="text-indigo-600 font-semibold text-sm mt-4">Auto Optimize</div>
                </div>
            </div>

            </div>
        </main>

        {/* Footer Minimal */}
        <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500 font-normal">
            &copy; 2026 IMG2PDF Gateway. Built with React & Node.js
        </footer>
        </div>
    );
}