import { useNavigate, NavLink } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const cleanValues = {
          email: values.email.trim(),
          password: values.password.trim(),
        };

        const querySnapshot = await getDocs(collection(db, "users"));

        let users = [];
        querySnapshot.forEach((doc) => users.push(doc.data()));

        const user = users.find(
          u =>
            u.email === cleanValues.email &&
            u.password === cleanValues.password
        );

        if (user) {
          localStorage.setItem("userloggedIn", "true");

          localStorage.setItem(
            "user",
            JSON.stringify({
              email: user.email,
            })
          );

          nav("/", { replace: true });
        } else {
          alert("Invalid email or password");
        }
      } catch (err) {
        console.error(err);
        alert("Login failed");
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
}}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="col-11 col-sm-9 col-md-6 col-lg-4 p-4 rounded-4 shadow-lg bg-white"
      >
        <h2 className="text-center fw-bold mb-4">Welcome Back 👋</h2>

        <div className="mb-3">
          <label className="fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="form-control rounded-3"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-danger">{formik.errors.email}</small>
          )}
        </div>

        <div className="mb-3">
          <label className="fw-semibold">Password</label>
          <input
            type="password"
            name="password"
            className="form-control rounded-3"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <small className="text-danger">{formik.errors.password}</small>
          )}
        </div>

        <div className="d-grid gap-3 mt-4">
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="btn btn-primary fw-bold py-2"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>

          <NavLink
            to="/register"
            className="btn btn-outline-dark fw-bold py-2"
          >
            Create Account
          </NavLink>
        </div>
      </form>
    </div>
  );
}