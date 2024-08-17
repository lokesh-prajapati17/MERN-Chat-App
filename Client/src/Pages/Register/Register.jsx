import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/echat_logog-removebg-preview.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { AllApis } from "../../Utils/ApiRoutes";
import "react-toastify/dist/ReactToastify.css";
const validationSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const { registerApi } = AllApis;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = async (data) => {
    const response = await fetch(registerApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      toast.success("success", {
        theme: "dark",
        draggable: true,
      });
      const responseJson = await response.json()
      localStorage.setItem(
        "e-chat-data",
        JSON.stringify(responseJson.userData)
      );
      navigate("/avatar");
    } else if (response.status === 400) {
      console.log("error 400 use register");
    } else if (response.status === 500) {
      console.log("error 500 register");
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark">
        <ToastContainer />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "94vh" }}
        >
          <div
            className="col-lg-6 col-md-5 col-sm-12 d-flex justify-content-center rounded-3 align-items-center"
            style={{ border: "1px solid lightblue" }}
          >
            <div className="col-lg-6 col-sm-12 col-md-6 pt-1  p-2">
              <div className="d-flex mb-3 align-items-between flex-row">
                <img
                  src={logo}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                  alt=""
                />
                <p className="text-info fw-bold fs-4 ms-2 mt-1">
                  Welcome to E-chat
                </p>
              </div>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control border-info border-2"
                    id="floatingName"
                    name="username"
                    placeholder="Username"
                    {...register("username")}
                  />
                  <label htmlFor="floatingName">User Name</label>
                  {errors.username && (
                    <p className="text-danger">{errors.username.message}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control border-info border-2"
                    id="floatingEmail"
                    name="email"
                    placeholder="Email address"
                    {...register("email")}
                  />
                  <label htmlFor="floatingEmail">Email address</label>
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control border-info border-2"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    {...register("password")}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control border-info border-2"
                    id="floatingCPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    {...register("confirmPassword")}
                  />
                  <label htmlFor="floatingCPassword">Confirm Password</label>
                  {errors.confirmPassword && (
                    <p className="text-danger">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-info rounded-0 p-2 w-75 "
                  >
                    <span className="text-center">Register User</span>
                  </button>
                </div>
                <p className="text-center mt-3 text-light text-uppercase">
                  Already have an account?{" "}
                  <NavLink className="text-decoration-none" to={"/login"}>
                    Login
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
