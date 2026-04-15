import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../Firebase.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
        const cleanValues = {
          email: values.email.trim(),
          password: values.password.trim(),
        };

        await addDoc(collection(db, "users"), cleanValues);

        alert("User registered successfully");
        nav("/login");
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
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
        <h2 className="text-center fw-bold mb-4">Create Account 🚀</h2>

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
            placeholder="Create password"
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
            className="form-control rounded-3"
            placeholder="Confirm password"
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
            className="btn btn-primary fw-bold py-2"
          >
            {formik.isSubmitting ? "Registering..." : "Register"}
          </button>

          <NavLink
            to="/login"
            className="btn btn-outline-dark fw-bold py-2"
          >
            Already have an account?
          </NavLink>
        </div>
      </form>
    </div>
  );
}