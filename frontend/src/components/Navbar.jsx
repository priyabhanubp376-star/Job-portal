import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Job Portal</h2>

      <Link to="/">Home</Link>

      {/* COMMON LINKS (ALL LOGGED USERS) */}
      {user && (
        <>
          <Link to="/jobs">Jobs</Link>
          <Link to="/my-applications">My Applications</Link>
        </>
      )}

      {/* USER ONLY */}
      {user?.role === "user" && (
        <>
          <Link to="/upload-resume">Upload Resume</Link>
        </>
      )}

      {/* ADMIN ONLY */}
      {user?.role === "admin" && (
        <>
          <Link to="/admin">Admin Panel</Link>
          <Link to="/admin-resumes">View Resumes</Link>
        </>
      )}

      {/* GUEST */}
      {!user && (
        <>
          <Link to="/login">User Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/admin-login">Admin Login</Link>
        </>
      )}

      {/* LOGOUT */}
      {user && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;