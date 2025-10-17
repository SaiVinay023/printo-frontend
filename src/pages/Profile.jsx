import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/profile"); // Connects to /api/profile with Bearer token
        setUser(res.data);
      } catch (error) {
        navigate("/login");
      }
    }

    fetchProfile();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome, {user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      {!user.two_factor_secret && (
        <div className="mt-4">
          <p className="text-red-500 font-bold mb-2">2FA is not enabled!</p>
          <button
            className="btn bg-blue-500 text-white"
            onClick={() => navigate("/setup-2fa")}
          >
            Enable Google Authenticator 2FA
          </button>
        </div>
      )}

    </div>
  );
}
