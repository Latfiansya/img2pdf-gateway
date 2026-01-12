import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username:"", email:"", password:"" });
    const nav = useNavigate();

    const submit = async e => {
        e.preventDefault();

        if (form.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            await api.post("/auth/register", form);
            alert("Register success!");
            nav("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Register failed");
        }
    };

    return (
        <div className="page">
        <h2>Register</h2>
        <form onSubmit={submit}>
            <input placeholder="Username" onChange={e=>setForm({...form,username:e.target.value})}/>
            <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
            <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
            <button>Register</button>
        </form>
        </div>
    );
}
