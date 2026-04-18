import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_EMAILS = ["admin@gmail.com"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      const user = userCredential.user;

      if (ADMIN_EMAILS.includes(user.email)) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/dashboard");
      } else {
        alert("You are not an admin ");
      }

    } catch (err) {
      console.error(err);

      if (err.code === "auth/user-not-found") {
        alert("Admin not found");
      } else if (err.code === "auth/wrong-password") {
        alert("Wrong password");
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light"
    style={{ background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" }}>
      <form
        onSubmit={handleSubmit}
        className="col-12 col-md-5 bg-light p-4 rounded shadow"
      >
        <h2 className="text-dark text-center mb-4">Admin Login</h2>

        <div className="mb-3">
          <label className="text-dark">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-dark">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}