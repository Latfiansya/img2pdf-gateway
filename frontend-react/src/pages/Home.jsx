import { useNavigate } from "react-router-dom";

export default function Home() {
    const nav = useNavigate();

    return (
        <div className="page">
        <h1>IMG2PDF Gateway</h1>
        <p>Instant Report Generator with Auto Compression</p>
        <div className="actions">
            <button onClick={() => nav("/register")}>Get Started</button>
            <button onClick={() => nav("/login")}>Login</button>
        </div>
        </div>
    );
}
