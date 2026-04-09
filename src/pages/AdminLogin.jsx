import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase.js";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const snapshot = await getDocs(collection(db, "admin"));

      let admin = [];

      snapshot.forEach((doc) => {
        admin.push(doc.data());
      });

      const admins = admin.find(
        a => a.email === email && a.password === password
      );

      if (admins) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/dashboard");
      } else {
        alert("Invalid admin credentials!");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light px-3 m-0">
      <form
        onSubmit={handleSubmit}
        className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 bg-danger p-4 p-md-5 rounded shadow"
      >
        <h2 className="mb-4 text-white text-center">Admin Login</h2>

        <div className="mb-3">
          <label className="text-white">Email</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-white">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-secondary w-100 fw-bold">
          Login
        </button>
      </form>
    </div>
  );
}