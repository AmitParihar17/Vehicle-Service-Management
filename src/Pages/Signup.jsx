//  import React from "react";
//  import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
//  import { Button, Checkbox, Form, Input } from "antd";
//  import { NavLink, useNavigate } from "react-router-dom";
//  import axios from "axios";
//  import { ToastContainer, toast } from "react-toastify";
//  import "react-toastify/dist/ReactToastify.css";

//  const Signup = () => {
//    const navigate = useNavigate();

//    const onFinish = (values) => {
//      console.log("Received values of form: ", values);

//      const { username, email, password, confirmPassword } = values;

//      axios
//        .post("http://localhost:5001/api/auth/register", {
//          username,
//          email,
//          password,
//          confirmPassword,
//        })
//        .then((result) => {
//          console.log(result);
//          toast.success("Signup successful! Redirecting to login...", {
//            position: "top-right",
//            autoClose: 3000,
//          });
//          setTimeout(() => navigate("/login"), 3000);
//        })
//        .catch((err) => {
//          console.error(
//            "Signup failed:",
//            err.response?.data?.message || err.message
//          );
//          toast.error("Signup failed. Please try again.", {
//            position: "top-right",
//            autoClose: 3000,
//          });
//        });
//    };

//    return (
//      <div
//        style={{
//          display: "flex",
//          alignItems: "center",
//          justifyContent: "center",
//          minHeight: "100vh",
//          backgroundColor: "#f3f4f6",
//        }}
//      >
//        <Form
//          name="signup"
//          initialValues={{ remember: true }}
//          onFinish={onFinish}
//          style={{
//            backgroundColor: "white",
//            padding: "3rem",
//            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//            borderRadius: "0.5rem",
//            width: "24rem",
//          }}
//        >
//          <h2
//            style={{
//              fontSize: "1.5rem",
//              fontWeight: "600",
//              textAlign: "center",
//            }}
//          >
//            Sign Up
//          </h2>

//          <Form.Item
//            name="username"
//            rules={[{ required: true, message: "Please enter your Username!" }]}
//          >
//            <Input prefix={<UserOutlined />} placeholder="Username" />
//          </Form.Item>

//          <Form.Item
//            name="email"
//            rules={[
//              { required: true, message: "Please enter your Email!" },
//              { type: "email", message: "Please enter a valid Email!" },
//            ]}
//          >
//            <Input prefix={<MailOutlined />} placeholder="Email" />
//          </Form.Item>

//          <Form.Item
//            name="password"
//            rules={[{ required: true, message: "Please enter your Password!" }]}
//          >
//            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
//          </Form.Item>

//          <Form.Item
//            name="confirmPassword"
//            dependencies={["password"]}
//            rules={[
//              { required: true, message: "Please confirm your Password!" },
//              ({ getFieldValue }) => ({
//                validator(_, value) {
//                  return !value || getFieldValue("password") === value
//                    ? Promise.resolve()
//                    : Promise.reject(new Error("Passwords do not match!"));
//                },
//              }),
//            ]}
//          >
//            <Input.Password
//              prefix={<LockOutlined />}
//              placeholder="Confirm Password"
//            />
//          </Form.Item>

//          <div
//            style={{
//              display: "flex",
//              justifyContent: "space-between",
//              alignItems: "center",
//            }}
//          >
//            <Form.Item
//              name="remember"
//              valuePropName="checked"
//              style={{ marginBottom: 0 }}
//            >
//              <Checkbox>Remember me</Checkbox>
//            </Form.Item>
//            <NavLink to="/forgot-password" style={{ color: "#3b82f6" }}>
//              Forgot password?
//            </NavLink>
//          </div>

//          <Form.Item>
//            <Button
//              block
//              type="primary"
//              htmlType="submit"
//              style={{
//                backgroundColor: "#3b82f6",
//                borderColor: "#3b82f6",
//                padding: "0.75rem",
//                fontSize: "1rem",
//              }}
//            >
//              Sign Up
//            </Button>
//          </Form.Item>

//          <p style={{ textAlign: "center" }}>
//            Already have an account?
//            <NavLink
//              to="/login"
//              style={{ color: "#3b82f6", marginLeft: "0.25rem" }}
//            >
//              Log in
//            </NavLink>
//          </p>
//        </Form>
//        <ToastContainer />
//      </div>
//    );
//  };

//  export default Signup;


 import React, { useState } from "react";
 import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
 import { Button, Checkbox, Form, Input } from "antd";
 import { NavLink, useNavigate } from "react-router-dom";
 import axios from "axios";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader";

 const Signup = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const onFinish = (values) => {
     console.log("Received values of form: ", values);
     const { username, email, password, confirmPassword } = values;
     setLoading(true);

     axios
       .post("http://localhost:5001/api/auth/register", {
         username,
         email,
         password,
         confirmPassword,
       })
       .then((result) => {
         console.log(result);
         toast.success("Signup successful! Redirecting to login...", {
           position: "top-right",
           autoClose: 2000,
         });
         setTimeout(() => navigate("/login"), 2000);
       })
       .catch((err) => {
         console.error(
           "Signup failed:",
           err.response?.data?.message || err.message,
           setLoading(false)
         );
         toast.error("Signup failed. Please try again.", {
           position: "top-right",
           autoClose: 2000,
         });
       })
       
   };

   return (
    <div className="flex justify-center items-center h-screen">
      {loading ?(
        <Loader/>
      ) :(<div className="bg-white p-8 shadow-md rounded-md w-full max-w-md z-10">
         <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

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
               prefix={<UserOutlined />}
               placeholder="Username"
               className="py-2"
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
               prefix={<MailOutlined />}
               placeholder="Email"
               className="py-2"
             />
           </Form.Item>

           <Form.Item
             name="password"
             rules={[
               { required: true, message: "Please enter your Password!" },
             ]}
           >
             <Input.Password
               prefix={<LockOutlined />}
               placeholder="Password"
               className="py-2"
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
               prefix={<LockOutlined />}
               placeholder="Confirm Password"
               className="py-2"
             />
           </Form.Item>

           <div className="flex justify-between items-center mb-4">
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

           <Form.Item>
             <Button
               block
               type="primary"
               htmlType="submit"
               className="bg-blue-500 border-blue-500 py-2 text-lg"
               disabled={loading}
             >
               Sign Up
             </Button>
           </Form.Item>

           <p className="text-center">
             Already have an account?
             <NavLink to="/login" className="text-blue-500 ml-1">
               Log in
             </NavLink>
           </p>
         </Form>
       </div>
      )}
       <ToastContainer />
     </div>
   );
 };

 export default Signup;
