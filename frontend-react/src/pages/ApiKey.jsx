import { useState } from "react";
import api from "../services/api";

export default function ApiKey() {
    const [key,setKey] = useState(null);

    const generate = async ()=>{
        const res = await api.post("/api/v1/generate-key");
        setKey(res.data);
    };

    return (
        <div className="page">
        <h2>My API Key</h2>
        <button onClick={generate}>Generate API Key</button>
        {key && (
            <pre>{JSON.stringify(key,null,2)}</pre>
        )}
        </div>
    );
}
