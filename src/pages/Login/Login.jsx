import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../../assets/images/login.png";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Left Section */}
        <div className="left-section">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="login-image"
          />
        </div>

        {/* Right Section */}
        <div className="right-section">

          <h2>Welcome Back!</h2>

          <p className="login-subtitle">
            Login to continue tracking your habits.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button type="submit">
              Login
            </button>

          </form>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/">Register</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;