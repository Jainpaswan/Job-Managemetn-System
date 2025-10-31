import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import JobDetails from "./pages/JobDetails";
import ViewAppliedJobs from "./pages/ViewAppliedJob";
import CompanyDashboard from "./pages/CompanyDashboard";
import EditJob from "./pages/UpdateCompany";
import AddJob from "./pages/AddJob";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
    <Header/>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
          
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home/>
          
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails/>
          
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
             <Profile/>
          
            </ProtectedRoute>
          }
        />
        <Route
          path="/applied-jobs"
          element={
            <ProtectedRoute>
            <ViewAppliedJobs/>
          
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute>
           <CompanyDashboard/>
          
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/add-job"
          element={
            <ProtectedRoute>
           <AddJob/>
          
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/edit-job/:id"
          element={
            <ProtectedRoute>
          <EditJob/>
          
            </ProtectedRoute>
          }
        />
         <Route path="/search-results" 
         element={
         <SearchResults />} 
         />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
