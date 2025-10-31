import React, { useState } from "react";

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    skills: user.skills,
    role: user.role,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg text-white relative">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-700 p-2 rounded-md outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-700 p-2 rounded-md outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full bg-gray-700 p-2 rounded-md outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-gray-700 p-2 rounded-md outline-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-500 text-black font-semibold px-5 py-2 rounded-lg hover:bg-cyan-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
