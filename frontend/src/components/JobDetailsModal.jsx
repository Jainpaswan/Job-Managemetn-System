import { motion } from "framer-motion";

const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gradient-to-br from-gray-900 to-gray-950 text-white 
                   rounded-xl shadow-2xl border border-cyan-500/30 
                   p-8 w-[90%] max-w-lg overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold"
        >
          ×
        </button>

        {/* Job Header */}
        <h2 className="text-2xl font-bold text-cyan-400 mb-1 text-center">
          {job.jobname}
        </h2>
        <p className="text-gray-400 text-center mb-4">
          {job.company?.name || "Unknown Company"}
        </p>

        {/* Divider */}
        <div className="h-[1px] bg-gray-700 mb-4"></div>

        {/* Job Details */}
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="font-semibold text-white">Description:</span>{" "}
            {job.description}
          </p>
          <p>
            <span className="font-semibold text-white">Location:</span>{" "}
            {job.company?.location || "Not specified"}
          </p>
          <p>
            <span className="font-semibold text-white">Website:</span>{" "}
            <a
              href={job.company?.website}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline"
            >
              {job.company?.website || "N/A"}
            </a>
          </p>
          <p>
            <span className="font-semibold text-white">Salary:</span>{" "}
            ₹{job.salary?.toLocaleString() || "N/A"}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <p>
              <span className="font-semibold text-white">Start Date:</span>{" "}
              {job.startDate}
            </p>
            <p>
              <span className="font-semibold text-white">End Date:</span>{" "}
              {job.endDate}
            </p>
          </div>

          <p>
            <span className="font-semibold text-white">Status:</span>{" "}
            <span
              className={`${
                job.status === "Open" ? "text-green-400" : "text-red-400"
              } font-semibold`}
            >
             Applied
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetailsModal;
