import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
 
export default function Navbars() {
    let loggedinUser = localStorage.getItem("userloggedIn")
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
        <NavLink className="nav-link text-light" to="/">Home</NavLink>
        <NavLink className="nav-link text-light" to="/categories">Quizes</NavLink>
        <NavLink className="nav-link text-light" to="/leaderboard">Leaderboard</NavLink>
      </div>

      <div className="ms-auto mt-2 mt-lg-0">
        {loggedinUser ? (
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => {
              localStorage.removeItem("userloggedIn");
              nav("/login");
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
