import "./Auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return alert("Please fill all fields");
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      console.log("LOGIN SUCCESS:", res.data);

      login(res.data.user, res.data.token);

      alert("Login Successful 🚀");

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back 👋</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        {/* ✅ FORGOT PASSWORD LINK */}
        <div style={{ marginTop: "10px" }}>
          <Link to="/forgot-password" style={{ color: "blue" }}>
            Forgot Password?
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;