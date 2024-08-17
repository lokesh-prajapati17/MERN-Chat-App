import React from "react";
import logo from "../../Assets/echat_logog-removebg-preview.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AllApis } from "../../Utils/ApiRoutes";
import { NavLink, useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().min(8).max(16).required(),
});

const Login = () => {
  const navigate = useNavigate();
  const { loginApi } = AllApis;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  

  const handleFormSubmit = async (data) => {
    try {
      const response = await fetch(loginApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.status === 200) {
        console.log("success 200 ", response);
        const responseJson = await response.json()
        localStorage.setItem("e-chat-data", JSON.stringify(responseJson.user));
        navigate("/");
        toast.success("success");
      } else if (response.status === 400) {
        console.log("Incorrect details");
        toast.error("Incorrect details");
      } else if (response.status === 500) {
        console.log("Server error");
        toast.error("Server error");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark">
        <ToastContainer />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "94vh" }}
        >
          <div
            className="col-lg-6 col-md-5 col-sm-12 d-flex justify-content-center rounded-3 align-items-center"
            style={{ border: "1px solid lightblue" }}
          >
            <div className="col-lg-6 col-sm-12 col-md-6 pt-4 pb-4 p-2">
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
                    id="floatingEmail"
                    name="username"
                    placeholder="Email address"
                    {...register("username")}
                  />
                  <label htmlFor="floatingEmail">Username</label>
                  {errors.username && (
                    <p className="text-danger">{errors.username.message}</p>
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

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-info rounded-0 p-2 w-75 "
                  >
                    <span className="text-center">Login User</span>
                  </button>
                </div>
                <p className="text-center mt-3 text-light text-uppercase">
                  If You Don't have an account?{" "}
                  <NavLink className="text-decoration-none" to="/register">
                    Register
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

export default Login;
