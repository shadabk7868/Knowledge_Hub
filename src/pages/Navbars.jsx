import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
 
export default function Navbars() {
  const { currentUser } = useContext(AuthContext);
    let nav = useNavigate()

    return (
        <nav className="navbar navbar-expand-lg shadow"
        style={{
    background: "linear-gradient(135deg, #445bc2, #281a37)"
  }}>
  <div className="container-fluid">

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="nav">

      <div className="navbar-nav gap-3">
        <NavLink className={({ isActive }) =>
  isActive
    ? "nav-link text-warning fw-bold"
    : "nav-link text-light"
} to="/">Home</NavLink>
        <NavLink className={({ isActive }) =>
  isActive
    ? "nav-link text-warning fw-bold"
    : "nav-link text-light"
} to="/categories">Quizes</NavLink>
        <NavLink className={({ isActive }) =>
  isActive
    ? "nav-link text-warning fw-bold"
    : "nav-link text-light"
} to="/rankings">
  Leaderboard
</NavLink>
      </div>

      <div className="ms-auto mt-2 mt-lg-0">
        {currentUser ? (
          <button
            className="btn btn-outline-light btn-sm"
            onClick={async () => {
  await signOut(auth);
  nav("/login", { replace: true });
}}
          >
            Logout
          </button>
        ) : (
          <NavLink className="btn btn-outline-light btn-sm" to="/login">
            Login / Signup
          </NavLink>
        )}
      </div>

    </div>
  </div>
</nav>
    )
}
