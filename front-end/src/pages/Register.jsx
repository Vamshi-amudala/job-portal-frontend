import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", role: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      console.log("Registered:", data);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="">Select Role</option>
        <option value="Employer">Employer</option>
        <option value="Jobseeker">Jobseeker</option>
      </select>
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};
