import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";
import { Link } from "react-router-dom";
import JobDetailsModal from "../components/JobDetailsModal";

const ViewAppliedJobs = () => {
  const user = useSelector((state) => state.auth.user);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        if (!user?.email) return;
        const res = await api.get(`/api/applications/user?email=${user.email}`);
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, [user]);

  const openJobDetails = async (id) => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setSelectedJob(res.data);
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  };

 const getFileUrl = (filePath) => {
  if (!filePath) return null;
  const filename = filePath.split("\\").pop().split("/").pop();
  return `${api.defaults.baseURL}api/files/${encodeURIComponent(filename)}`;
};


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading your applied jobs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-20 relative">
      <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">
          Your Applied Jobs
        </h1>

        {applications.length === 0 ? (
          <div className="text-gray-300 text-center py-10">
            <p className="text-lg">You haven’t applied for any jobs yet.</p>
            <Link
              to="/dashboard"
              className="text-cyan-400 hover:underline mt-2 inline-block"
            >
              Browse available jobs →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-700 hover:border-cyan-500 transition"
              >
                <div
                  onClick={() => openJobDetails(app.job.id)}
                  className="cursor-pointer"
                >
                  <h2 className="text-xl font-semibold text-cyan-300">
                    {app.job?.jobname || "Unknown Job"}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    {app.job?.company?.name || "Unknown Company"}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold text-white">Status:</span>{" "}
                    {app.status}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold text-white">Applied on:</span>{" "}
                    {new Date(app.appliedAt).toLocaleString()}
                  </p>
                </div>

                {/* Resume & Cover Letter Buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {app.resume && (
                    <a
                      href={getFileUrl(app.resume)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-cyan-600 hover:bg-cyan-700 text-white py-1.5 px-4 rounded-lg text-sm transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Resume
                    </a>
                  )}
                  {app.coverLetter && (
                    <a
                      href={getFileUrl(app.coverLetter)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-4 rounded-lg text-sm transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Cover Letter
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Floating Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default ViewAppliedJobs;
