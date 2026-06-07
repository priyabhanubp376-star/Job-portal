import "./Auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (res.data.user.role !== "admin") {
        alert("Only Admin Allowed");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Admin Login Successful");
      navigate("/admin");

    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Admin Login 🔐</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleAdminLogin}>
          Login as Admin
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;