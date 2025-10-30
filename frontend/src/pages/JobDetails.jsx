import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineFilePdf } from "react-icons/ai";
import api from "../services/api";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // form data
  const [formData, setFormData] = useState({
    email: "",
    skills: "",
    resume: null,
    coverLetter: null,
  });

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
      }
    };
    fetchJob();
  }, [id]);

  // Handle application submission
const handleApply = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);

    const form = new FormData();
    form.append("email", formData.email || user.email);
    form.append("skills", formData.skills);
    if (formData.resume) form.append("resume", formData.resume);
    if (formData.coverLetter) form.append("coverLetter", formData.coverLetter);

    const res = await api.post(`/jobs/${id}/apply`, form, {
      headers: {
        "Content-Type": "multipart/form-data", // force multipart
      },
      transformRequest: [(data) => data], // prevent axios from converting FormData to JSON
    });

    if (res.status === 200 || res.status === 201) {
      setApplied(true);
      setShowForm(false);
      alert("✅ You have successfully applied for this job!");
    }
  } catch (err) {
    console.error("❌ Error applying for job:", err);
    alert("❌ Failed to apply for the job. Try again later.");
  } finally {
    setLoading(false);
  }
};


  if (!job) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-20">
      <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        {/* Job Info */}
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">
          {job.jobname}
        </h1>
        <p className="text-gray-300 mb-6">{job.description}</p>

        <div className="space-y-2 text-gray-300">
          <p>
            <span className="font-semibold text-white">Status:</span>{" "}
            {job.status}
          </p>
          <p>
            <span className="font-semibold text-white">Salary:</span> ₹
            {job.salary}
          </p>
          <p>
            <span className="font-semibold text-white">Start Date:</span>{" "}
            {job.startDate}
          </p>
          <p>
            <span className="font-semibold text-white">End Date:</span>{" "}
            {job.endDate}
          </p>
        </div>

        {/* Company Info */}
        <div className="mt-6 border-t text-white border-gray-700 pt-4">
          <h2 className="text-xl font-semibold text-cyan-400 mb-2">
            Company Info
          </h2>
          <p>
            <span className="font-semibold text-white">Name:</span>{" "}
            {job.company?.name}
          </p>
          <p>
            <span className="font-semibold text-white">Location:</span>{" "}
            {job.company?.location}
          </p>
          <p>
            <span className="font-semibold text-white">Contact:</span>{" "}
            {job.company?.contact}
          </p>
          <p>
            <span className="font-semibold text-white">Website:</span>{" "}
            <a
              href={job.company?.website}
              target="_blank"
              rel="noreferrer"
              className="text-purple-400 hover:underline"
            >
              {job.company?.website}
            </a>
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between items-center mt-6">
          <Link
            to="/dashboard"
            className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            ← Back to Jobs
          </Link>

          {user?.role === "USER" && !applied && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-5 rounded-lg transition"
            >
              Apply Now
            </button>
          )}

          {applied && (
            <span className="text-green-400 font-medium">
              ✅ Already Applied
            </span>
          )}
        </div>
      </div>

      {/* Floating Apply Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
              Apply for {job.jobname}
            </h2>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email || user.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                  <AiOutlineFilePdf /> Resume (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setFormData({ ...formData, resume: e.target.files[0] })
                  }
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                  <AiOutlineFilePdf /> Cover Letter (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setFormData({ ...formData, coverLetter: e.target.files[0] })
                  }
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  placeholder="e.g. Java, Spring Boot, SQL"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-5 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
