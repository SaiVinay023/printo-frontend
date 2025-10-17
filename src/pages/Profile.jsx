import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/profile"); // /api/profile with Bearer token is set via api.js
        setUser(res.data);
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        navigate("/login");
      }
    }
    fetchProfile();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  // Demographic fields render only with 2FA enabled
  const demographicFields = (
    <div>
      <h2>Welcome, {user.first_name} {user.last_name}</h2>
      <p>Email: {user.email}</p>
      <div>Full Address: {user.full_address}</div>
      <div>Street Address: {user.street_address}</div>
      <div>City: {user.city}</div>
      <div>Country: {user.country}</div>
      <div>Zip Code: {user.zip_code}</div>
      <div>Mobile Phone: {user.mobile_phone_number}</div>
    </div>
  );

  return (
    <div>
      {user.two_factor_secret ? (
        // Demographic info only if 2FA is enabled
        demographicFields
      ) : (
        // Prompt to setup 2FA
        <div className="mt-4">
          <p className="text-red-500 font-bold mb-2">
            2FA is not enabled! You must enable two-factor authentication to view your profile data.
          </p>
          <button
            className="btn bg-blue-500 text-white"
            onClick={() => navigate("/setup-2fa")}
          >
            Enable Google Authenticator 2FA
          </button>
        </div>
      )}
      <button
        className="btn bg-red-600 text-white mt-6"
        onClick={() => {
          localStorage.removeItem("user_id");
          localStorage.removeItem("access_token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
