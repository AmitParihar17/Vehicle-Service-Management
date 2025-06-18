import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader";
import { baseURL } from "../../config.js";
import axiosInstance from "../../axiosInstance.js";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { UseAppContext } from "../Context/AppContext.jsx";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = UseAppContext()
 const onFinish = async (values) => {
   setLoading(true);
   try {
     // Prepare the payload by adding role: "user"
     const payload = { ...values, role: "user" };
     const response = await axiosInstance.post(
       `${baseURL}/api/auth/login`,
       payload
     );

     if (response.data.success) {
       localStorage.setItem("token", response.data.token);
       localStorage.setItem("user", JSON.stringify(response.data.user));
       toast.success("Login successful! Redirecting...", {
         position: "top-right",
         autoClose: 3000,
       });

       setTimeout(() => {
         navigate("/", { replace: true });
         login(response.data.user, response.data.token);
       }, 3000);
     } else {
       toast.error(response.data.message || "Login failed.", {
         position: "top-right",
         autoClose: 3000,
       });
     }
   } catch (error) {
     const message =
       error.response?.data?.message || "Login failed. Please try again.";
     toast.error(message, {
       position: "top-right",
       autoClose: 3000,
     });
   } finally {
     setLoading(false);
   }
 };
 const responseGoogle = async (authResult) => {
  const role="user"
   setLoading(true);
   try {
     if (authResult.code) {
       // Pass the role parameter along with the code
       const payload = { code: authResult.code, role };

       const res = await axios.post(
         "http://localhost:5001/api/auth/google",
         payload
       );
       const { user, isNewUser } = res.data;

       const { email, name, image, token, role: userRole } = user;

       const userInfo = {
         email,
         name,
         role: userRole,
         image,
       };

       localStorage.setItem("user", JSON.stringify(userInfo));
       localStorage.setItem("token", token);
       localStorage.setItem("userType", userRole); // Update the userType key
       login(response.data.user, response.data.token);
       window.dispatchEvent(new Event("loginStatusChanged"));

       const successMessage = isNewUser
         ? "Registration Successful!"
         : "Login Successful!";

       toast.success(successMessage, { position: "top-center" });
       setTimeout(() => navigate(`/`), 2000);
     } else {
       throw new Error("Google authentication failed");
     }
   } catch (error) {
     console.error("Error during Google authentication:", error.message);
     toast.error("Failed to login", { position: "top-center" });
   } finally {
     setLoading(false);
   }
 };

 const googleLogin = useGoogleLogin({
   onSuccess: responseGoogle,
   onError: responseGoogle,
   flow: "auth-code",
 });


  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-6">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-2xl w-96 border border-gray-700">
          <h2 className="text-3xl font-bold text-red-500 text-center mb-6">
            Log In
          </h2>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="space-y-4 text-white"
          >
            {/* Email */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your Email!" }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Email"
                className="bg-[#2c2c2c] text-white border-none"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                className="bg-[#2c2c2c] text-white border-none"
              />
            </Form.Item>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="mb-0"
              >
                <Checkbox className="text-gray-300">Remember me</Checkbox>
              </Form.Item>
              <NavLink
                to="/forgot-password"
                className="text-red-400 hover:underline"
              >
                Forgot password?
              </NavLink>
            </div>

            {/* Login Button */}
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="bg-red-500 hover:bg-red-600 font-semibold text-white"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-700 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={() => googleLogin()}
            className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-100 transition mb-4"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="G"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
          {/* Signup Link */}
          <p className="text-center mt-4 text-gray-300">
            Don’t have an account?
            <NavLink to="/signup" className="text-red-400 hover:underline ml-1">
              Sign Up
            </NavLink>
          </p>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <NavLink
              to="/"
              className="inline-block px-4 py-2 mt-2 border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
            >
              ← Back to Home
            </NavLink>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
