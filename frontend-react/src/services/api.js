import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
});

// Service untuk Generate/Regenerate Key
export const generateApiKeyService = () => {
    return api.post("/api/v1/generate-key");
};

// Service untuk Convert PDF
// butuh headers khusus untuk x-public-key dan x-private-key
export const convertPdfService = (formData, publicKey, privateKey) => {
    return api.post("/api/v1/convert-pdf", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-public-key": publicKey,
            "x-private-key": privateKey
        },
        responseType: "blob" // agar return-nya berupa file (binary)
    });
};

export default api;