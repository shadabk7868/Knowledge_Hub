import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        await addDoc(collection(db, "users"), values);

        alert("User registered successfully");
        nav("/login");
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    },
  });

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light px-3 m-0">
      <form
        onSubmit={formik.handleSubmit}
        className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 text-white p-4 p-md-5 rounded shadow"
        style={{ background: "linear-gradient(135deg,#8d64b6,#48325c)" }}
      >
        <h2 className="text-center text-white mb-4">Register User</h2>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-warning">{formik.errors.email}</small>
          )}
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <small className="text-warning">{formik.errors.password}</small>
          )}
        </div>

        <button type="submit" className="btn btn-light w-100 fw-bold">
          Register
        </button>
      </form>
    </div>
  );
}