import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

export default function Register() {
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .matches(/[0-9]/, "At least 1 number")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const email = values.email.trim();
        const password = values.password.trim();

        await createUserWithEmailAndPassword(auth, email, password);

        alert("User registered successfully ");
        nav("/login");

      } catch (err) {
        console.error(err);

        if (err.code === "auth/email-already-in-use") {
          alert("Email already registered");
        } else {
          alert("Registration failed");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" }}>

      <form
        onSubmit={formik.handleSubmit}
        className="col-11 col-sm-9 col-md-6 col-lg-4 p-4 rounded-4 shadow-lg bg-white"
      >
        <h2 className="text-center fw-bold mb-4">Create Account 🚀</h2>

        <div className="mb-3">
          <label className="fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
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
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <small className="text-danger">{formik.errors.password}</small>
          )}
        </div>

        <div className="mb-3">
          <label className="fw-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <small className="text-danger">{formik.errors.confirmPassword}</small>
          )}
        </div>

        <div className="d-grid gap-3 mt-4">
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="btn btn-primary"
          >
            {formik.isSubmitting ? "Registering..." : "Register"}
          </button>

          <NavLink to="/login" className="btn btn-outline-dark">
            Already have an account?
          </NavLink>
        </div>
      </form>
    </div>
  );
}