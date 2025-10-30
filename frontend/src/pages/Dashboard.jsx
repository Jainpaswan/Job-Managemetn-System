import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import companyImg from "../assets/react.svg";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    if (token) fetchJobs();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Available Jobs
        </h1>

        {jobs.length === 0 ? (
          <p className="text-gray-400 text-center">No jobs found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-black/40 backdrop-blur-md shadow-lg rounded-xl p-5 flex flex-col gap-3 hover:scale-105 hover:shadow-cyan-500/50  transition"
              >
                <img
                  src={companyImg}
                  alt="company logo"
                  className="w-12 h-12 mx-auto mb-2"
                />
                <h2 className="text-xl font-semibold text-cyan-400 text-center">
                  {job.jobname}
                </h2>
                <p className="text-gray-300 text-sm text-center">
                  {job.description.length > 100
                    ? job.description.slice(0, 100) + "..."
                    : job.description}
                </p>

                <div className="text-gray-400 text-sm mt-2 space-y-1">
                  <p>
                    <span className="text-white font-semibold">Status:</span>{" "}
                    {job.status}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Salary:</span> ₹
                    {job.salary}
                  </p>
                </div>

                <div className="mt-3 border-t border-gray-700 pt-3 text-sm text-gray-400">
                  <p>
                    <span className="text-white font-semibold">Company:</span>{" "}
                    {job.company?.name}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Location:</span>{" "}
                    {job.company?.location}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Contact:</span>{" "}
                    {job.company?.contact}
                  </p>
                </div>

                {/* ✅ View Details Button */}
                <Link
                  to={`/jobs/${job.id}`}
                  className="mt-4 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg text-center transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
