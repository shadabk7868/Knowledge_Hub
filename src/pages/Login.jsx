import { useNavigate, NavLink } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
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
    const email = values.email.trim();
    const password = values.password.trim();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: user.email,
      })
    );

    nav("/", { replace: true });

  } catch (err) {
    console.error(err);

    if (
      err.code === "auth/invalid-credential" ||
      err.code === "auth/wrong-password" ||
      err.code === "auth/user-not-found"
    ) {
      alert("Invalid email or password");
    } else {
      alert("Login failed");
    }
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