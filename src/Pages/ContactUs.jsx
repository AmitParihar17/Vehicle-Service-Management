

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

const ContactUs = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    message.success("Message sent successfully!");
    form.resetFields();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Contact Us
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Have questions or need service? Fill out the form below, and we'll get
          back to you soon!
        </p>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message!" }]}
          >
            <Input.TextArea placeholder="Write your message" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
