import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function TwoFA() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
    return (
      <div className="mx-auto mt-24 text-red-500 font-bold">
        User ID missing! Please login again.
      </div>
    );
  }

    async function handleSubmit(e) {
        e.preventDefault(); // Prevent form from refreshing the page
        setError(""); // Clear previous error message
        try {
            const res = await api.post("/verify-2fa", { user_id, code });
            localStorage.removeItem("user_id");
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/profile");

        } catch (error) {
            setError("Invalid 2FA code");
            
        }
    }
    return (
        <div className="max-w-sm mx-auto mt-24 p-8 bg-white shadow rounded">
            <h1 className="text-xl font-bold mb-4">Two-Factor Authentication</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="2FA Code" value={code}
          onChange={e=>setCode(e.target.value)} required className="input input-bordered"/>
        {error && <div className="text-red-600">{error}</div>}
        <button className="btn bg-blue-600 text-white">Verify</button>
      </form>
    </div>
  );
}