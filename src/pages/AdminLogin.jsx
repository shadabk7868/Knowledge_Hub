// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

 
//   const ADMIN_EMAIL = "admin@admin.com";
//   const ADMIN_PASSWORD = "admin123";

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      
//       localStorage.setItem("adminLoggedIn", true);
//       navigate("/dashboard"); 
//     } else {
//       alert("Invalid admin credentials!");
//     }
//   };

//   return (
//     <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="w-50 bg-secondary p-5 rounded"
//       >
//         <h2 className="mb-4 text-dark">Admin Login</h2>

//         <div className="mb-3">
//           <label className="form-label text-dark">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label text-dark">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="form-control"
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

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
      console.log(admin)
      
      const admins = admin.find(
        a => a.email === email && a.password === Number(password)
      );
      console.log(admins);
      
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
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="w-50 bg-danger p-5 rounded">
        <h2 className="mb-4 text-dark">Admin Login</h2>

        <div className="mb-3">
          <label className="form-label text-dark">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-dark">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-secondary text-light w-100">
          Login
        </button>
      </form>
    </div>
  );
}
