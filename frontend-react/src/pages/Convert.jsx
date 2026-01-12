import { useState } from "react";
import api from "../services/api";

export default function Convert() {
    const [files,setFiles] = useState([]);
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [layout,setLayout] = useState("single");
    const [useCover,setUseCover] = useState(false);

    const submit = async ()=>{
        const form = new FormData();
        files.forEach(f=>form.append("images",f));
        form.append("layout",layout);
        form.append("useCover",useCover);
        form.append("title",title);
        form.append("author",author);

        const res = await api.post("/api/v1/convert-pdf",form,{ responseType:"blob" });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href=url; a.download="report.pdf"; a.click();
    };

    return (
        <div className="page">
        <h2>Convert Images to PDF</h2>

        <input type="file" multiple onChange={e=>setFiles([...e.target.files])} />

        <label>
            <input type="checkbox" onChange={e=>setUseCover(e.target.checked)}/> Use Cover Page
        </label>

        {useCover && (
            <>
            <input placeholder="Title" onChange={e=>setTitle(e.target.value)} />
            <input placeholder="Author" onChange={e=>setAuthor(e.target.value)} />
            </>
        )}

        <select onChange={e=>setLayout(e.target.value)}>
            <option value="single">1 Image / Page</option>
            <option value="grid">4 Images / Page</option>
        </select>

        <button onClick={submit}>Export PDF</button>
        </div>
    );
}
