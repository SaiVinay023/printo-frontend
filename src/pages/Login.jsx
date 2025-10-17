import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

      async function handleSubmit(e) {
        e.preventDefault(); // Prevent form from refreshing the page
        setError(""); // Clear previous error message
        localStorage.removeItem("user_id");
        localStorage.removeItem("access_token");
        try {   
            const res = await api.post("/login", { email, password });
            if (res.data.access_token) {
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/profile");
            } else if (res.data["2fa_required"]) { 
            localStorage.setItem("user_id", res.data.user_id);
            navigate("/2fa");
            }
            else if (res.data["setup_2fa_required"]) { 
          localStorage.setItem("user_id", res.data.user_id);
          navigate("/setup-2fa");
          }
           else {
            navigate("/setup-2fa");
          }
            } catch (err) {
            setError("Invalid credentials");
            }
        }
        return (
    <div className="max-w-sm mx-auto mt-24 p-8 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" value={email}
          onChange={e=>setEmail(e.target.value)} required className="input input-bordered"/>
        <input type="password" placeholder="Password" value={password}
          onChange={e=>setPassword(e.target.value)} required className="input input-bordered"/>
        {error && <div className="text-red-600">{error}</div>}
        <button className="btn bg-blue-600 text-white">Login</button>
      </form>
    </div>
        );
        }