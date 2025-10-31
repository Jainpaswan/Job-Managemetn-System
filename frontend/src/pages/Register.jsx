import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CompanyRegister from "../components/CompanyRegister";
import UserRegister from "../components/UserRegister";

const Register = () => {
  const [role, setRole] = useState("USER");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black  text-white">
      <div className="w-96 p-8 rounded-2xl bg-black/30 backdrop-blur-md shadow-xl border mt-10 border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 tracking-wide">
          Register as{" "}
          <span className="text-purple-500">
            {role === "USER" ? "User" : "Company"}
          </span>
        </h2>

        {/* Toggle buttons */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setRole("USER")}
            className={`px-5 py-2 rounded-l-lg font-medium transition-all duration-300 ${
              role === "USER"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setRole("COMPANY")}
            className={`px-5 py-2 rounded-r-lg font-medium transition-all duration-300 ${
              role === "COMPANY"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            Company
          </button>
        </div>

        {/* Animated Form Switch */}
        <div className="relative min-h-[350px]">
          <AnimatePresence mode="wait">
            {role === "USER" ? (
              <motion.div
                key="user"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <UserRegister />
              </motion.div>
            ) : (
              <motion.div
                key="company"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <CompanyRegister />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Register;
