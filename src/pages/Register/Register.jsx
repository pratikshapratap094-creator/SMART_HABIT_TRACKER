import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import registerImage from "../../assets/images/register.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://smart-habit-tracker-nbqd.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        {/* Left Section */}
        <div className="left-section">
          <img
            src={registerImage}
            alt="Register Illustration"
            className="register-image"
          />
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h2>Create Your Account</h2>

          <p className="register-subtitle">
            Start your journey to build better habits.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && (
              <p className="register-error">
                {error}
              </p>
            )}

            <button type="submit">
              Register
            </button>

          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;