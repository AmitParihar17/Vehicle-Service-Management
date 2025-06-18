import { Layout, Form, Input, Button, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axiosinstance from "../../axiosInnstance";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { baseURL } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Content } = Layout;
const { Text } = Typography;

const UploadService = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    formData.append("serviceName", values.serviceName);
    formData.append("serviceDescription", values.serviceDescription.trim());
    formData.append("servicePrice", values.servicePrice);
    formData.append("approxTime", values.approxTime);
    formData.append("contact", values.contact);

    try {
      const response = await axiosinstance.post(
        `${baseURL}/api/service/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Upload failed. Please try again."
      );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: "16px", background: "#fff" }}>
          <div className="flex justify-center items-center">
            <div className="my-10 py-10 px-5 md:px-20 bg-gray-100 rounded-2xl w-full max-w-xl">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                encType="multipart/form-data"
                className="space-y-5"
              >
                <Form.Item
                  label="Service Images"
                  name="files"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e?.fileList}
                  rules={[{ required: true, message: "Please upload images" }]}
                >
                  <Upload
                    accept="image/*"
                    beforeUpload={() => false}
                    listType="picture-card"
                    onChange={handleFileChange}
                    multiple
                    fileList={fileList}
                  >
                    <div>
                      <UploadOutlined />
                      <Text>Upload</Text>
                    </div>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="Service Name"
                  name="serviceName"
                  rules={[{ required: true, message: "Enter service name" }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>

                <Form.Item
                  label="Service Description"
                  name="serviceDescription"
                  rules={[
                    {
                      required: true,
                      min: 20,
                      message: "Minimum 20 characters",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Type here" rows={6} />
                </Form.Item>

                <Form.Item
                  label="Service Price"
                  name="servicePrice"
                  rules={[{ required: true, message: "Enter service price" }]}
                >
                  <Input type="number" placeholder="₹" />
                </Form.Item>

                <Form.Item
                  label="Mobile Number"
                  name="contact"
                  rules={[
                    { required: true, message: "Enter mobile number" },
                    {
                      pattern: /^[6-9]\d{9}$/,
                      message: "Enter valid 10-digit mobile number",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Mobile Number" />
                </Form.Item>

                <Form.Item
                  label="Approximate Time (e.g. 30 minutes, 1 hour)"
                  name="approxTime"
                  rules={[
                    { required: true, message: "Enter approximate time" },
                  ]}
                >
                  <Input placeholder="e.g. 45 minutes" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    ADD SERVICE
                  </Button>
                </Form.Item>
              </Form>
              <ToastContainer position="top-center" />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UploadService;
