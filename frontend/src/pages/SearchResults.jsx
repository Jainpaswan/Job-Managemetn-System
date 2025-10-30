import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api"; // ✅ your axios instance (adjust path if needed)

const SearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // ✅ using your axios instance
        const res = await api.get(`/jobs/search?keyword=${keyword}`);
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    if (keyword) fetchJobs();
  }, [keyword]);

  if (loading) {
    return <div className="text-center text-white mt-10">Loading jobs...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-20">
      <h1 className="text-3xl text-white font-bold mb-6">
        Search Results for: <span className="text-cyan-400">{keyword}</span>
      </h1>

      {jobs.length === 0 ? (
        <p className="font-bold text-3xl text-red-400">No jobs found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2  lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <h2 className="text-xl font-semibold text-cyan-400 mb-2">
                {job.jobname}
              </h2>
              <p className="text-gray-300 mb-2">{job.description}</p>
              <p className="text-m text-white mb-2">
                <strong className="text-cyan-400">Status:</strong> {job.status}
              </p>
              <p className="text-sm text-white mb-2">
                <strong className="text-cyan-400">Salary:</strong> ₹{job.salary}
              </p>

              {job.company && (
                <div className="text-sm text-white mt-4 border-t border-gray-600 pt-2">
                  <p><strong className="text-cyan-400">Company:</strong> {job.company.name}</p>
                  <p><strong className="text-cyan-400">Location:</strong> {job.company.location}</p>
                  <p><strong className="text-cyan-400">Contact:</strong> {job.company.contact}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
