// import React, { useState } from 'react'
// import { Navigate } from 'react-router-dom'

// export default function ProtectedRoute({ children }) {
//   let [admin, setAdmin] = useState(localStorage.getItem("loggedin"))
//   console.log(admin)

//   return (
//     <div>
//       {admin ? children : <Navigate to="/dashboard-login" />}
//     </div>
//   )
// }


// import { Navigate } from 'react-router-dom'

// export default function ProtectedRoute({ children }) {
//   const admin = localStorage.getItem("loggedin")
//   return admin ? children : <Navigate to="/dashboard-login" />
// }

import { Children } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
 const isLoggedIn = localStorage.getItem("adminLoggedIn");
 
  return isLoggedIn === "true"
    ? children
    : <Navigate to="/dashboard-login" replace />;
}

