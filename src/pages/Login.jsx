import { useNavigate, NavLink } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase.js';
import { useFormik } from 'formik';

export default function Login() {
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));

        let users = [];

        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });

        const user = users.find(
          u => u.email === values.email && u.password === values.password
        );

        if (user) {
          localStorage.setItem("userloggedIn", "true");
          nav("/", { replace: true });
        } else {
          alert("Invalid email or password");
        }

      } catch (err) {
        console.error(err);
        alert("Login failed");
      }
    }
  });

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center px-3 m-0">
      <form
        onSubmit={formik.handleSubmit}
        className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 p-4 p-md-5 rounded shadow"
        style={{
          background: "linear-gradient(135deg,#8d64b6,#48325c)"
        }}
      >
        <h2 className="text-center text-white mb-4">Login User</h2>

        <div className="mb-3">
          <label className="text-white">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-white">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between gap-3">
          <button className="btn btn-light fw-bold w-100">
            Submit
          </button>

          <NavLink
            to="/register"
            className="text-dark text-decoration-none text-center mt-2 mt-sm-0"
          >
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
}