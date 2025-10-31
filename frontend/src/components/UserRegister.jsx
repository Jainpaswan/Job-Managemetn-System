import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleUserRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const skills = e.target.skills.value;

    try {
      await api.post("/users/register", { name, email, password, skills });
      alert("User registered successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("User registration failed!");
    }
  };

  return (
    <form onSubmit={handleUserRegister} className="flex flex-col gap-4">
      <input
        name="name"
        type="text"
        placeholder="Full Name"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <input
        name="skills"
        type="text"
        placeholder="Skills (e.g. Java, React, SQL)"
        className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <button
        type="submit"
        className="p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
      >
        Register
      </button>
    </form>
  );
};

export default UserRegister;
