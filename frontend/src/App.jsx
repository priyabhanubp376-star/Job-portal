import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import MyApplications from "./pages/MyApplications";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import JobDetails from "./pages/JobDetails";

import ResumeUpload from "./pages/ResumeUpload";
import AdminResumes from "./pages/AdminResumes";
import ForgotPassword from "./pages/ForgotPassword";



// 🔐 Admin Route Protection
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

// 🔐 User Protected Route (optional but recommended)
const UserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* USER PROTECTED ROUTE */}
        <Route
          path="/my-applications"
          element={
            <UserRoute>
              <MyApplications />
            </UserRoute>
          }
        />

        {/* ADMIN PROTECTED ROUTE */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
<Route
  path="/admin-resumes"
  element={
    <AdminRoute>
      <AdminResumes />
    </AdminRoute>
  }
/>

<Route
  path="/upload-resume"
  element={
    <UserRoute>
      <ResumeUpload />
    </UserRoute>
  }
/>
<Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;