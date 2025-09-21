import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import DreamJob from "../components/DreamJob";
import Companies from "../components/Companies";
import JobCategory from "../components/JobCategory";
import Working from "../components/Working";
import Testimonials from "../components/Testimonials";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  


  return (
     <div className="min-h-screen   bg-gradient-to-br from-gray-900 to-black">
    <DreamJob/>
    <Companies/>
    <JobCategory/>
    <Working/>
    <Testimonials/>
    </div>
  );
};

export default Dashboard;
