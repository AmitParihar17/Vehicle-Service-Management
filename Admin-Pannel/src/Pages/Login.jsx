 import React, { useState } from "react";
 import { LockOutlined, UserOutlined } from "@ant-design/icons";
 import { Button, Checkbox, Form, Input, message } from "antd";
 import { useNavigate, useParams, NavLink } from "react-router-dom";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

 import { baseURL } from "../../config.js";
 import axiosInstance from "../../axiosInnstance.js";

 const Login = () => {
   const navigate = useNavigate();
   const { role } = useParams();
   const [loading, setLoading] = useState(false);

   const onFinish = async (values) => {
     setLoading(true);
     const { email, password } = values;

     try {
       const response = await axiosInstance.post(`${baseURL}/api/auth/login`, {
         email,
         password,
         role: role || "admin",
       });

       if (response.data.success) {
         message.success(response.data.message);
         toast.success("Successfully Logged In", { position: "top-center" });

         const { payload, token } = response.data;

         if (payload) {
           localStorage.setItem(
             "user",
             JSON.stringify({
               username: payload.username || "",
               email: payload.email || "",
               role: payload.role || "",
             })
           );
         }

         if (token) {
           localStorage.setItem("token", token);
         }

         window.dispatchEvent(new Event("loginStatusChanged"));

         setTimeout(() => {
           navigate("/dashboard");
           setLoading(false);
         }, 2000);
       } else {
         const errorMsg = response.data.message || "Login failed";
         message.error(errorMsg);
         toast.error(errorMsg, { position: "top-center" });
         setLoading(false);
       }
     } catch (error) {
       const errorMsg =
         error.response?.data?.message || error.message || "Login failed";
       message.error(errorMsg);
       toast.error(errorMsg, { position: "top-center" });
       setLoading(false);
     }
   };

   return (
     <div className="flex justify-center items-center h-screen bg-gray-100">
       <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-sm border border-green-400">
         <h2 className="text-2xl font-bold text-center mb-6 capitalize">
           {role || "Admin"} Login
         </h2>

         <Form
           name="login"
           initialValues={{ remember: true }}
           onFinish={onFinish}
           className="space-y-4"
         >
           <Form.Item
             name="email"
             rules={[{ required: true, message: "Please input your email!" }]}
           >
             <Input
               prefix={<UserOutlined className="text-gray-500" />}
               placeholder="Email"
               className="py-2 px-4 border border-gray-300 rounded-md"
             />
           </Form.Item>

           <Form.Item
             name="password"
             rules={[
               { required: true, message: "Please input your Password!" },
             ]}
           >
             <Input.Password
               prefix={<LockOutlined className="text-gray-500" />}
               placeholder="Password"
               className="py-2 px-4 border border-gray-300 rounded-md"
             />
           </Form.Item>

           <Form.Item>
             <div className="flex justify-between items-center">
               <Checkbox className="text-gray-600">Remember me</Checkbox>
               <NavLink
                 to="/forgot-password"
                 className="text-green-600 hover:underline"
               >
                 Forgot password?
               </NavLink>
             </div>
           </Form.Item>

           <Form.Item>
             <Button
               block
               type="primary"
               htmlType="submit"
               className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition"
               loading={loading}
             >
               Log in
             </Button>
           </Form.Item>
         </Form>
       </div>

       <ToastContainer />
     </div>
   );
 };

 export default Login;
