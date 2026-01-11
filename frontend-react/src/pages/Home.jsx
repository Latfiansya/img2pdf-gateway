import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ padding: 40 }}>
        <h1>IMG2PDF Gateway</h1>
        <p>Instant Report Generator with Auto Compression.</p>

        <Link to="/register">
            <button>Get Started</button>
        </Link>

        <Link to="/login" style={{ marginLeft: 10 }}>
            <button>Login</button>
        </Link>
        </div>
    );
}
