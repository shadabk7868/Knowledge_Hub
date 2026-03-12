import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/dashboard-login", { replace: true });
  };

  return (
    <>
      {/* Navbar for Admin */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">Admin Panel</span>
        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          Logout
        </button>
      </nav>

      <div className="d-flex w-100 vh-100">
        {/* Sidebar */}
        <div className="bg-secondary sidebar pt-3 p-3 d-flex flex-column gap-4" style={{ minWidth: "200px" }}>
          <NavLink className="nav-link text-white" to="">Dashboard</NavLink>
          <NavLink className="nav-link text-white" to="addquiz">Add Quiz</NavLink>
          <NavLink className="nav-link text-white" to="showquiz">Show Quiz</NavLink>
          <button className="btn btn-info text-white mt-3" onClick={() => navigate("/")}>Go Back</button>
        </div>

        {/* Main Content */}
        <div className="main p-4 w-100" style={{ overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
