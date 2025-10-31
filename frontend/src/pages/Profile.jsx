import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api"; // ✅ your axios instance
import EditProfileModal from "../components/EditProfileModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const loggedUser = useSelector((state) => state.auth.user);
  const userId = loggedUser?.id; // dynamic id// static for now, can be dynamic later

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdate = async (updatedData) => {
    try {
      const res = await api.put(`/users/${userId}`, updatedData);
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // ✅ if user data not yet loaded
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10 flex items-center justify-center">
      <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-700 mt-10 relative">

        {/* Banner Image */}
        <div className="relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1732757787074-0f95bf19cf73?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200"
            alt="Profile Banner"
            className="w-full h-56 object-cover object-center rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent rounded-t-2xl" />

          {/* Profile Image */}
          <img
            src="https://plus.unsplash.com/premium_photo-1732757787074-0f95bf19cf73?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200"
            alt="Profile"
            className="absolute -bottom-10 right-8 w-28 h-28 rounded-full border-4 border-gray-900 shadow-lg object-cover"
          />

          <h1 className="absolute bottom-4 left-6 text-3xl font-bold text-cyan-400">
            User Profile
          </h1>
        </div>

        {/* User Details */}
        <div className="p-8 space-y-4 text-lg mt-10">
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">User ID:</span>
            <span>{user.id}</span>
          </div>

          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Name:</span>
            <span>{user.name}</span>
          </div>

          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Email:</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Skills:</span>
            <span>{user.skills || "—"}</span>
          </div>

          

         

          {/* Edit Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-5 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditing(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default Profile;
