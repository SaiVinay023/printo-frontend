import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            try {  
                const response = await api.get("/profile");
                setUser(response.data);            
        } catch { navigate("/login"); }
    }
        fetchProfile();
    }, [navigate]);     

    if (!user) return <div>Loading...</div>;

     return (
    <div className="max-w-xl mx-auto mt-24 p-8 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Your Demographic Data</h1>
      <ul className="space-y-2 text-gray-800">
        <li><b>Name:</b> {user.name}</li>
        <li><b>Email:</b> {user.email}</li>
        <li><b>First Name:</b> {user.first_name}</li>
        <li><b>Last Name:</b> {user.last_name}</li>
        <li><b>Full Address:</b> {user.full_address}</li>
        <li><b>Street Address:</b> {user.street_address}</li>
        <li><b>City:</b> {user.city}</li>
        <li><b>Country:</b> {user.country}</li>
        <li><b>Zip Code:</b> {user.zip_code}</li>
        <li><b>Mobile Phone Number:</b> {user.mobile_phone_number}</li>
      </ul>
      <button
        className="btn mt-6 bg-red-600 text-white"
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }}
      >Logout</button>
    </div>
  );
}