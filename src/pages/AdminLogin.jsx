import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fixed Admin Credentials
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "123456";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      email.trim() === ADMIN_EMAIL &&
      password.trim() === ADMIN_PASSWORD
    ) {
      localStorage.setItem("adminLoggedIn", "true");

      navigate("/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="col-11 col-sm-9 col-md-6 col-lg-4 p-4 rounded-4 shadow-lg bg-white"
      >
        <h2 className="text-center fw-bold mb-4">
          Admin Login 🔐
        </h2>

        <div className="mb-3">
          <label className="fw-semibold">
            Email
          </label>

          <input
            type="email"
            className="form-control rounded-3"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="fw-semibold">
            Password
          </label>

          <input
            type="password"
            className="form-control rounded-3"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid gap-3 mt-4">
          <button
            type="submit"
            className="btn btn-primary fw-bold py-2"
          >
            Login
          </button>
        </div>

      </form>
    </div>
  );
}