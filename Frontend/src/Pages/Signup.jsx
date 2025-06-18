import React, { useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader";
import { useGoogleLogin } from "@react-oauth/google";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const onFinish = (values) => {
    const { username, email, password, confirmPassword } = values;
    const role = "user"; // Default role

    setLoading(true);

    axios
      .post("http://localhost:5001/api/auth/register", {
        username,
        email,
        password,
        confirmPassword,
        role,
      })
      .then(() => {
        toast.success("Signup successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        toast.error("Signup failed. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
        setLoading(false);
      });
  };
  const responseGoogle = async (authResult) => {
    console.log("authResult:", authResult);
    const role = "user";
    setLoading(true);
    try {
      if (authResult.code) {
      
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
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 text-white">
          <h2 className="text-3xl font-bold text-red-500 text-center mb-6">
            Sign Up
          </h2>

          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Username"
                className="bg-[#2c2c2c] text-white border-none"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your Email!" },
                { type: "email", message: "Please enter a valid Email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Email"
                className="bg-[#2c2c2c] text-white border-none"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your Password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
                {
                  pattern: /(?=.*[!@#$%^&*])/,
                  message:
                    "Password must include at least one special character!",
                },
                {
                  pattern: /(?=.*\d)/,
                  message: "Password must include at least one number!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                className="bg-[#2c2c2c] text-white border-none"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your Password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return !value || getFieldValue("password") === value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm Password"
                className="bg-[#2c2c2c] text-white border-none"
              />
            </Form.Item>

            <div className="flex justify-between items-center mb-4 text-sm">
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

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="bg-red-500 hover:bg-red-600 font-semibold text-white"
                disabled={loading}
              >
                Sign Up
              </Button>
            </Form.Item>

            <p className="text-center text-gray-300">
              Already have an account?
              <NavLink
                to="/login"
                className="text-red-400 hover:underline ml-1"
              >
                Log in
              </NavLink>
            </p>

            <p className="text-center text-gray-400 mt-4">
              <NavLink to="/" className="text-sm text-red-400 hover:underline">
                ← Back to Home
              </NavLink>
            </p>
          </Form>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-700 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={() => googleLogin()}
            className="flex items-center justify-center gap-2 w-full bg-white text-black border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-100 transition mb-4"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="G"
              className="w-5 h-5 "
            />
            Continue with Google
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Signup;



