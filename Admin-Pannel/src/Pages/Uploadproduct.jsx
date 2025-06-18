import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import axiosinstance from "../../axiosInnstance";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../config";

const { Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

const Uploadproduct = () => {
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

    formData.append("productName", values.productName);
    formData.append("productDescription", values.productDescription.trim());
    formData.append("inStock", values.inStock === "true");
    formData.append("category", values.category);
    formData.append("productPrice", values.productPrice);
    formData.append("offerPrice", values.offerPrice);

    try {
      const response = await axiosinstance.post(
        `${baseURL}/api/auth/uploadfile`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: "16px", background: "#fff" }}>
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="my-10 py-10 px-5 md:px-20 bg-gray-100 rounded-2xl w-full max-w-xl">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-5"
                encType="multipart/form-data"
              >
                <Form.Item
                  label="Product Images"
                  name="images"
                  valuePropName="fileList"
                  getValueFromEvent={(e) =>
                    Array.isArray(e) ? e : e?.fileList
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please upload product images",
                    },
                  ]}
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
                      <Text>Upload Images</Text>
                    </div>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="Product Name"
                  name="productName"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product name",
                    },
                  ]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>

                <Form.Item
                  label="Product Description"
                  name="productDescription"
                  rules={[
                    {
                      required: true,
                      min: 20,
                      message:
                        "Please enter description of at least 20 characters",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Type here" rows={6} />
                </Form.Item>

                <Form.Item
                  label="Stock"
                  name="inStock"
                  rules={[
                    {
                      required: true,
                      message: "Please select stock availability",
                    },
                  ]}
                >
                  <Select placeholder="Is Available">
                    <Option value="true">Yes</Option>
                    <Option value="false">No</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: "Please select a category" },
                  ]}
                >
                  <Select placeholder="Select Category">
                    {[
                      "Seat Covers",
                      "Floor Mats",
                      "Car Perfumes",
                      "Mobile Holders",
                      "LED Lights",
                      "Alloy Wheels",
                      "Steering Covers",
                      "Wipers",
                      "Air Fresheners",
                      "Roof Racks",
                      "Car Covers",
                    ].map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Product Price"
                      name="productPrice"
                      rules={[
                        {
                          required: true,
                          message: "Please input the product price",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="0" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Offer Price"
                      name="offerPrice"
                      rules={[
                        {
                          required: true,
                          message: "Please input the offer price",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="0" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    ADD
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

export default Uploadproduct;
