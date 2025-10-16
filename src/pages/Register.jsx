import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", password_confirmation: "",
    first_name: "", last_name: "", full_address: "", street_address: "",
    city: "", country: "", zip_code: "", mobile_phone_number: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await api.post("/register", form);
      setSuccess("Registration successful! Please login.");
    } catch (err) {
      setError("Registration failed. Check your info.");
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Register</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="name" required placeholder="Username" value={form.name} onChange={handleChange} className="input"/>
        <input name="email" required type="email" placeholder="Email" value={form.email} onChange={handleChange} className="input"/>
        <input name="password" required type="password" placeholder="Password" value={form.password} onChange={handleChange} className="input"/>
        <input name="password_confirmation" required type="password" placeholder="Confirm Password" value={form.password_confirmation} onChange={handleChange} className="input"/>
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="input"/>
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} className="input"/>
        <input name="full_address" placeholder="Full Address" value={form.full_address} onChange={handleChange} className="input"/>
        <input name="street_address" placeholder="Street Address" value={form.street_address} onChange={handleChange} className="input"/>
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="input"/>
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="input"/>
        <input name="zip_code" placeholder="Zip Code" value={form.zip_code} onChange={handleChange} className="input"/>
        <input name="mobile_phone_number" placeholder="Mobile Phone" value={form.mobile_phone_number} onChange={handleChange} className="input"/>
        {error && <div className="col-span-2 text-red-600">{error}</div>}
        {success && <div className="col-span-2 text-green-600">{success}</div>}
        <button type="submit" className="btn bg-green-600 text-white col-span-2">Submit & Next</button>
      </form>
      <div className="text-center mt-4">
        <button className="btn bg-blue-500 text-white px-4 py-2 mt-2" onClick={()=>navigate("/login")}>Login</button>
      </div>
    </div>
  );
}