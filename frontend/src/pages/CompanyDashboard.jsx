import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Briefcase, PlusCircle, Edit2, Trash2 } from "lucide-react";

const CompanyDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (!user?.id) return;

        // Fetch company details
        const companyRes = await api.get(`/companies/${user.id}`);
        setCompany(companyRes.data);

        // Fetch jobs by company id
        const jobRes = await api.get(`/jobs/company/${user.id}`);
        setJobs(jobRes.data);
      } catch (err) {
        console.error("Error fetching company dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [user?.id]);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await api.delete(`/jobs/${jobId}`);
      alert("Job deleted successfully!");
      setJobs((prev) => prev.filter((job) => job.id !== jobId)); // remove from UI
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Failed to delete job!");
    }
  };

  const handleEdit = (jobId) => {
    navigate(`/company/edit-job/${jobId}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white text-xl">
        Loading dashboard...
      </div>
    );

  if (!company)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-red-400 text-xl">
        Company not found!
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">
          Welcome, {company.name}
        </h1>
        <button
          onClick={() => navigate("/company/add-job")}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl transition"
        >
          <PlusCircle size={18} />
          Post New Job
        </button>
      </div>

      {/* Company Info Card */}
      <div className="bg-gray-800/60 rounded-2xl p-6 backdrop-blur-lg border border-gray-700 mb-10">
        <h2 className="text-xl font-semibold text-purple-300 mb-4">
          Company Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <p>
            <span className="text-gray-400">Email:</span> {company.email}
          </p>
          <p>
            <span className="text-gray-400">Website:</span>{" "}
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              {company.website || "N/A"}
            </a>
          </p>
          <p>
            <span className="text-gray-400">Contact:</span>{" "}
            {company.contact || "N/A"}
          </p>
          <p>
            <span className="text-gray-400">Location:</span>{" "}
            {company.location || "N/A"}
          </p>
          <p>
            <span className="text-gray-400">Role:</span> {company.role}
          </p>
        </div>
      </div>

      {/* Jobs Section */}
      <div>
        <h2 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
          <Briefcase size={20} /> Posted Jobs
        </h2>
        <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
          {jobs && jobs.length > 0 ? (
            <ul className="space-y-3">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="bg-gray-900/60 p-4 rounded-lg border border-gray-700 hover:border-purple-500 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-400">
                        {job.jobname}
                      </h3>
                      <p className="text-gray-300 mt-1">{job.description}</p>
                      <p className="text-gray-400 mt-1 text-sm">
                        Salary: ₹{job.salary.toLocaleString()}
                      </p>
                      <p className="text-gray-500 mt-1 text-sm">
                        Duration: {job.startDate} → {job.endDate}
                      </p>
                      <span className="text-gray-400 text-sm">
                        Status: {job.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(job.id)}
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-500"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="flex items-center gap-1 text-red-400 hover:text-red-500"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No jobs posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
