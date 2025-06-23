import React, { useState, useEffect } from "react";
import { Layout, Table, Select, message } from "antd";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import axiosInstance from "../../axiosInnstance";
import { baseURL } from "../../config";
import { toast, ToastContainer } from "react-toastify";

const { Content, Footer } = Layout;
const { Option } = Select;

const ManageServiceBookings = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get(`${baseURL}/api/service/allbookings`);
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosInstance.put(
        `${baseURL}/api/service/updatestatus/${id}`,
        { status: newStatus }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchBookings();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date & Time",
      render: (_, record) => (
        <>
          <div>{record.date}</div>
          <div>{record.time}</div>
        </>
      ),
    },
    {
      title: "Services",
      dataIndex: "selectedServices",
      key: "selectedServices",
      render: (services) =>
        services && services.length > 0
          ? services.map((s, i) => <div key={i}>• {s.serviceName}</div>)
          : "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 140 }}
          onChange={(value) => handleStatusChange(record._id, value)}
          disabled={status === "approved"} // Disable if already approved
        >
          <Option value="Pending">Pending</Option>
          <Option value="approved">Approved</Option>
        </Select>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ToastContainer position="top-center" />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="m-4">
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Manage Service Bookings
            </h2>
            <Table
              columns={columns}
              dataSource={bookings}
              rowKey="_id"
              pagination={{ pageSize: 6 }}
              bordered
            />
          </div>
        </Content>
        <Footer className="text-center">Service Bookings ©2025</Footer>
      </Layout>
    </Layout>
  );
};

export default ManageServiceBookings;
