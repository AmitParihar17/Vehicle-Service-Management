 import React, { useState } from "react";
  import { motion } from "motion/react";
 import { Form, Input, Button, message } from "antd";
import axiosInstance from "../../axiosInstance";
import { baseURL } from "../../config";
import { toast, ToastContainer } from "react-toastify";

 const ContactUs = () => {
   const [form] = Form.useForm();

   const handleSubmit = async(values) => {
    try{
    const response = await axiosInstance.post(`${baseURL}/api/contact/contact_us`,values)
    if(response.data.success){
      console.log(response.data.message)
      toast.success(response.data.message)
    }
     form.resetFields();
   }
   catch(err){
      console.log(err.response.data.message)
      toast.error(err.response.data.message);
   }
  };

   return (
      <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex justify-center items-center min-h-screen bg-black px-6 py-20">
       <div className="bg-[#1f1f1f] shadow-2xl rounded-xl p-8 max-w-lg w-full border border-gray-700">
        <ToastContainer position="top-center"/>
         <h2 className="text-3xl font-bold text-red-500 mb-4 text-center">
           Contact Us
         </h2>
         <p className="text-gray-300 text-center mb-6">
           Have questions or need service? Fill out the form below and we'll get
           back to you soon!
         </p>
         <Form
           form={form}
           layout="vertical"
           onFinish={handleSubmit}
           className="text-white"
         >
           <Form.Item
             label={<span className="text-white">Name</span>}
             name="name"
             rules={[{ required: true, message: "Please enter your name!" }]}
           >
             <Input
               placeholder="Enter your name"
               className="bg-[#2c2c2c] text-white border-none"
             />
           </Form.Item>
           <Form.Item
             label={<span className="text-white">Email</span>}
             name="email"
             rules={[
               { required: true, message: "Please enter your email!" },
               { type: "email", message: "Please enter a valid email!" },
             ]}
           >
             <Input
               placeholder="Enter your email"
               className="bg-[#2c2c2c] text-white border-none"
             />
           </Form.Item>
           <Form.Item
             label={<span className="text-white">Message</span>}
             name="message"
             rules={[{ required: true, message: "Please enter your message!" }]}
           >
             <Input.TextArea
               placeholder="Write your message"
               rows={4}
               className="bg-[#2c2c2c] text-white border-none"
             />
           </Form.Item>
           <Form.Item>
             <Button
               type="primary"
               htmlType="submit"
               block
               className="bg-red-500 hover:bg-red-600 text-white font-semibold"
             >
               Send Message
             </Button>
           </Form.Item>
         </Form>
       </div>
     </motion.div>
   );
 };

 export default ContactUs;
