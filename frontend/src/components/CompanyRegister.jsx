import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CompanyRegister = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const website = e.target.website.value.trim();
    const contact = e.target.contact.value.trim();
    const location = e.target.location.value.trim();

    try {
      await api.post("/companies/register", {
        name,
        email,
        password,
        website,
        contact,
        location,
        role: "COMPANY", // ✅ required by backend
      });

      alert("✅ Company registered successfully!");
      navigate("/"); // redirect to login
    } catch (err) {
      console.error("❌ Registration failed:", err);
      alert("Company registration failed!");
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <input
        name="name"
        type="text"
        placeholder="Company Name"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
      <input
        name="website"
        type="url"
        placeholder="Website (https://example.com)"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        name="contact"
        type="text"
        placeholder="Contact Number"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        name="location"
        type="text"
        placeholder="Location"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        type="submit"
        className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
      >
        Register
      </button>
    </form>
  );
};

export default CompanyRegister;
