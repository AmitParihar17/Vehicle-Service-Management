import React, { useState, useEffect } from "react";
import { Layout, Table, Tag, Select, message } from "antd";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import axiosInstance from "../../axiosInnstance";
import { baseURL } from "../../config";
import { toast, ToastContainer } from "react-toastify";

const { Content, Footer } = Layout;

const ManageOrders = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const FetchOrders = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/api/order/allorders`
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    FetchOrders();
  }, []);

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axiosInstance.put(
        `${baseURL}/api/order/update/${id}`, {status: newStatus,});
      if (response.data.success) {
        toast.success(response.data.message)
        FetchOrders(); // Refresh data
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.response.data.message)
    }
  };

  // Table columns
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "orderId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price (₹)",
      dataIndex: "offerPrice",
      key: "price",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => {
        return address ? (
          <div>
            <div>
              <strong>{address.fullName}</strong>
            </div>
            <div>
              {address.street}, {address.city}
            </div>
            <div>
              {address.state} - {address.pincode}
            </div>
            <div>{address.phone}</div>
          </div>
        ) : (
          "N/A"
        );
      },
    },
    {
      title: "Payment",
      dataIndex: "paymentOption",
      key: "paymentOption",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        let color = "green";
        if (status === "Processing") color = "orange";
        else if (status === "Cancelled") color = "red";

        return (
          <Select
            defaultValue={status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record._id, value)}
          >
            <Select.Option value="Processing">Processing</Select.Option>
            <Select.Option value="Shipped">Shipped</Select.Option>
            <Select.Option value="Delivered">Delivered</Select.Option>
            <Select.Option value="Cancelled">Cancelled</Select.Option>
          </Select>
        );
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
        <ToastContainer position="top-center"/>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content className="m-4">
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
            <Table
              dataSource={orders}
              columns={columns}
              pagination={{ pageSize: 5 }}
              rowKey="_id"
              bordered
            />
          </div>
        </Content>

        <Footer className="text-center">Manage Orders ©2025</Footer>
      </Layout>
    </Layout>
  );
};

export default ManageOrders;
