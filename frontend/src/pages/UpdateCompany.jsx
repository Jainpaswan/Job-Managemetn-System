import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditJob = () => {
  const { id } = useParams(); // Job ID from URL
  const navigate = useNavigate();
  const [job, setJob] = useState({
    jobname: "",
    description: "",
    salary: "",
    startDate: "",
    endDate: "",
    status: "Open",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch job data by ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
        alert("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/jobs/${id}`, job);
      alert("Job updated successfully!");
      navigate("/company/dashboard");
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Failed to update job.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        Loading job details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10">
      <div className="max-w-3xl mx-auto bg-gray-800/60 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
          Edit Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Title */}
          <div>
            <label className="block text-gray-300 mb-2">Job Title</label>
            <input
              type="text"
              name="jobname"
              value={job.jobname}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={job.description}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-gray-300 mb-2">Salary (₹)</label>
            <input
              type="number"
              name="salary"
              value={job.salary}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={job.startDate}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={job.endDate}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-300 mb-2">Status</label>
            <select
              name="status"
              value={job.status}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/company/dashboard")}
              className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
