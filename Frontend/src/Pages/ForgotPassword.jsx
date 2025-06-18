import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

function ForgotPassword() {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0); // Countdown for resend
  const navigate = useNavigate();

  // Countdown effect
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleSendOtp = async (values, isResend = false) => {
    try {
      setLoading(true);
      const userEmail = isResend ? email : values.email;
      await axios.post("/api/auth/send-otp", { email: userEmail });

      setEmail(userEmail);
      message.success(
        isResend ? "OTP resent to your email" : "OTP sent to your email"
      );
      setStep(2);
      setTimer(60); // Reset timer
    } catch (err) {
      message.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/verify-otp", {
        email,
        otp: values.otp,
        password: values.password,
      });
      message.success("Password reset successfully!");
      form.resetFields();
      setStep(1);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      message.error("Invalid OTP or error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md bg-white rounded-xl">
      <Title level={3} className="text-center text-red-500">
        Forgot Password
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={step === 1 ? handleSendOtp : handleResetPassword}
      >
        {step === 1 ? (
          <>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-red-500"
                block
              >
                Send OTP
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item label="Email">
              <Input value={email} disabled />
            </Form.Item>

            <Form.Item
              label="OTP"
              name="otp"
              rules={[
                { required: true, message: "Enter the OTP sent to your email" },
              ]}
            >
              <Input placeholder="Enter OTP" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="password"
              rules={[{ required: true, message: "Enter your new password" }]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>

            {/* Resend OTP Button with Countdown */}
            <Form.Item>
              <Button
                onClick={() => handleSendOtp({}, true)}
                disabled={timer > 0}
                className="text-sm"
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </Button>
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between">
                <Button onClick={() => setStep(1)} disabled={loading}>
                  Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="bg-red-500"
                >
                  Reset Password
                </Button>
              </div>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
}

export default ForgotPassword;
