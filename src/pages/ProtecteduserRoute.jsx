import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx"

export default function ProtectedUserRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/login" replace/>;
}