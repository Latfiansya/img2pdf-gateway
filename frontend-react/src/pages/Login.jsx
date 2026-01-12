import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async () => {
        if (!identifier || !password) {
        alert("Fill all fields");
        return;
        }
        
        try {
        const res = await api.post("/auth/login", {
            identifier,
            password
        });

        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        } catch (err) {
        alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{ padding: 40 }}>
        <h2>Login</h2>

        <input
            placeholder="Email atau Username"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
        /><br /><br />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
        /><br /><br />

        <button onClick={submit}>Login</button>
        </div>
    );
}
