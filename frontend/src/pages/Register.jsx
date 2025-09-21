import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const website = e.target.website.value;
    const contact = e.target.contact.value;
    const location = e.target.location.value;

    try {
      const res = await api.post("/companies/register", {
        name,
        email,
        password,
        website,
        contact,
        location,
      });
      alert("Registration successful!");
      navigate("/"); // go to login after successful registration
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleRegister}
        className="w-96 p-8 rounded-2xl bg-black/30 backdrop-blur-md shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-white text-center">Register</h2>

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
    </div>
  );
};

export default Register;
