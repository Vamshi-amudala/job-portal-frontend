import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log("Login successful:", data);

      // Redirect based on role returned from backend
      if (data.role === "Employer") navigate("/employer-dashboard");
      else if (data.role === "Jobseeker") navigate("/jobseeker-dashboard");

      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message);
    }
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/login-page.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover blur-sm scale-105"
      />

      {/* Glassmorphic Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl backdrop-brightness-50"
      >
        {/* Header */}
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white">
          Welcome Back
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-emerald-400 to-gray-400 animate-pulse text-lg mt-2">
            Login to continue
          </span>
        </h2>

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <label className="absolute left-4 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-white peer-focus:text-sm">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <label className="absolute left-4 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-white peer-focus:text-sm">
            Password
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-white/20 hover:bg-white/40 text-white font-bold py-3 rounded-xl transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};
