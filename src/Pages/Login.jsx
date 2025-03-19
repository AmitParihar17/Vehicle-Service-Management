 import React ,{useState} from "react";
 import { LockOutlined, UserOutlined } from "@ant-design/icons";
 import { Button, Checkbox, Form, Input } from "antd";
 import { NavLink, useNavigate } from "react-router-dom";
 import axios from "axios";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 import Loader from "../Components/Loader";

 const Login = () => {
  const [loading,setLoading] = useState(false);
   const navigate = useNavigate();

   const onFinish = async (values) => {
     console.log("Data Submitted:", values);

     // Exclude "remember" before sending to backend
     const { remember, ...loginData } = values;
      setLoading(true)
     try {
       const response = await axios.post(
         "http://localhost:5001/api/auth/login",
         loginData // Send only email and password
       );

       if (response.data.success) {
         console.log("Login Successful:", response.data);
         toast.success("Login successful! Redirecting...", {
           position: "top-right",
           autoClose: 3000,
         });
         setTimeout(() => navigate("/"), 3000);
       } else {
         console.error("Login Error:", response.data.message);
         toast.error(
           response.data.message || "Login failed. Please try again.",
           {
             position: "top-right",
             autoClose: 3000,
           }
         );
       }
     } catch (error) {
       console.error(
         "Axios Error:",
         error.response?.data?.message || error.message,
         
       );
       toast.error("Login failed. Please try again.", {
         position: "top-right",
         autoClose: 3000,
         
       });
       setLoading(false);
     }
   };

   return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? (
        <Loader/>
      ):(
       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
         <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>
         <Form
           name="login"
           initialValues={{ remember: true }}
           onFinish={onFinish}
           className="space-y-4"
         >
           {/* Email */}
           <Form.Item
             name="email"
             rules={[{ required: true, message: "Please enter your Email!" }]}
           >
             <Input prefix={<UserOutlined />} placeholder="Email" />
           </Form.Item>

           {/* Password */}
           <Form.Item
             name="password"
             rules={[
               { required: true, message: "Please enter your Password!" },
             ]}
           >
             <Input.Password prefix={<LockOutlined />} placeholder="Password" />
           </Form.Item>

           {/* Remember Me & Forgot Password */}
           <div className="flex justify-between items-center">
             <Form.Item
               name="remember"
               valuePropName="checked"
               className="mb-0"
             >
               <Checkbox>Remember me</Checkbox>
             </Form.Item>
             <NavLink to="/forgot-password" className="text-blue-500">
               Forgot password?
             </NavLink>
           </div>

           {/* Login Button */}
           <Form.Item>
             <Button
               block
               type="primary"
               htmlType="submit"
               className="bg-blue-500 hover:bg-blue-600"
             >
               Log In
             </Button>
           </Form.Item>
         </Form>

         {/* Signup Link */}
         <p className="text-center mt-4">
           Don't have an account?
           <NavLink to="/signup" className="text-blue-500 ml-1">
             Sign Up
           </NavLink>
         </p>
       </div>
      )}
       <ToastContainer />
     </div>
   );
 };

 export default Login;
