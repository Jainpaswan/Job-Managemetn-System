import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../services/api";
import companyImg from "../assets/react.svg"; // replace with your company logo

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [companies, setCompanies] = useState([]);

 useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const res = await api.get("/companies/auth/getAll");
      setCompanies(res.data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  if (token) fetchCompanies(); // only fetch if logged in
}, [token]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Companies
        </h1>

        {companies.length === 0 ? (
          <p className="text-gray-400 text-center">No companies found {token}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-black/30 backdrop-blur-md shadow-lg rounded-xl p-5 flex flex-col items-center gap-4 hover:scale-105 transition"
              >
                <img
                  src={companyImg}
                  alt="company logo"
                  className="w-16 h-16"
                />
                <h2 className="text-xl font-semibold text-white">
                  {company.name}
                </h2>
                <p className="text-gray-300 text-sm">{company.location}</p>
                <a
                  href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  {company.website}
                </a>
                <p className="text-gray-400 text-sm">{company.contact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
