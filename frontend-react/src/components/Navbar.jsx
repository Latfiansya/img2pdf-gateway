export default function Navbar({ onOpenApiKey, onLogout }) {
    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-40">
        {/* KIRI: Logo Branding */}
        <div className="flex items-center space-x-2">
            <div className="w-12 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            I2P
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">IMG2PDF <span className="text-indigo-600">Gateway</span></span>
        </div>

        {/* KANAN: Actions */}
        <div className="flex items-center space-x-4">
            <button 
            onClick={onOpenApiKey}
            className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-gray-50 transition"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            <span>API Key</span>
            </button>

            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            <button 
            onClick={onLogout}
            className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md transition"
            >
            Logout
            </button>
        </div>
        </nav>
    );
}