import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Users from './pages/Users.jsx';
import DashHero from './pages/DashHero.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import ProtectedUserRoute from './pages/ProtectedUserRoute.jsx';
import UpdateUser from './pages/Updateuser.jsx';
import AddQuiz from './pages/AddQuiz.jsx';
import ShowQuiz from './pages/ShowQuiz.jsx';
import Navbar from './pages/Navbars.jsx';
import Quizzes from './pages/Quizzes.jsx';
import Categories from './pages/Categories.jsx';
import Leaderboard from './pages/Leaderboard.jsx';

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  

  return (
    <>
      {!location.pathname.startsWith("/dashboard") && <Navbar />}

      <Routes>
      
        <Route path="/" element={ <Home/>}/>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/categories" element={<ProtectedUserRoute><Categories /></ProtectedUserRoute>} />
        <Route path="/quizzes/:category" element={<ProtectedUserRoute><Quizzes /></ProtectedUserRoute>} />
        <Route path="/leaderboard/:category" element={<ProtectedUserRoute><Leaderboard /></ProtectedUserRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<DashHero />} />
          <Route path="users" element={<Users />} />
          <Route path="updateuser/:id" element={<UpdateUser />} />
          <Route path="addquiz" element={<AddQuiz />} />
          <Route path="showquiz" element={<ShowQuiz />} />
        </Route>

      </Routes>
    </>
  );
}
