 import React, { useState, useEffect } from "react";
 import {
   Table,
   Button,
   Modal,
   Form,
   Input,
   Select,
   message,
   Tag,
   Popconfirm,
 } from "antd";
import axiosInstance from "../../axiosInnstance"
import { baseURL } from "../../config"
 import { Layout, Row, Col, Card } from "antd";
 import Header from "../Components/Header";
 import Sidebar from "../Components/Sidebar";
 import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

 const { Option } = Select;
 const { Content, Footer } = Layout;

 const Users = () => {
   const [users, setUsers] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
   const [collapsed, setCollapsed] = useState(false);
   const [form] = Form.useForm();
   const [editForm] = Form.useForm();
   const [editingUser, setEditingUser] = useState(null);

   useEffect(() => {
     fetchUsers();
   }, []);

   const fetchUsers = async () => {
     try {
       const res = await axiosInstance.get(`${baseURL}/api/auth/users`);
       setUsers(res.data || []);
     } catch (error) {
       console.error("Failed to fetch users", error);
       message.error("Failed to load users");
       setUsers([]);
     }
   };

   const showModal = () => setIsModalVisible(true);
   const handleCancel = () => {
     setIsModalVisible(false);
     form.resetFields();
   };

   const showEditModal = (user) => {
     setEditingUser(user);
     setIsEditModalVisible(true);
     editForm.setFieldsValue(user);
   };

   const handleEditCancel = () => {
     setIsEditModalVisible(false);
     editForm.resetFields();
   };

   const handleAddUser = async (values) => {
     try {
       await axiosInstance.post(`${baseURL}/api/auth/addUser`, values);
       message.success("User added successfully!");
       setIsModalVisible(false);
       form.resetFields();
       fetchUsers();
     } catch (error) {
       console.error("Add user error:", error.response?.data || error.message);
       message.error(error.response?.data?.message || "Failed to add user");
     }
   };

   const handleUpdateUser = async (values) => {
     try {
       await axiosInstance.put(
         `${baseURL}/api/auth/updateUser/${editingUser._id}`,
         values
       );
       message.success("User updated successfully!");
       setIsEditModalVisible(false);
       fetchUsers();
     } catch (error) {
       console.error("Update error:", error);
       message.error("Failed to update user");
     }
   };

   const handleDelete = async (userId) => {
     try {
       await axiosInstance.delete(
         `${baseURL}/api/auth/deleteUser/${userId}`
       );
       message.success("User deleted successfully!");
       fetchUsers();
     } catch (error) {
       console.error("Delete error:", error);
       message.error("Failed to delete user");
     }
   };

   const userColumns = [
     {
       title: "Username",
       dataIndex: "username",
       key: "username",
     },
     {
       title: "Email",
       dataIndex: "email",
       key: "email",
     },
     {
       title: "Role",
       dataIndex: "role",
       key: "role",
       render: (role) => (
         <Tag color={role === "admin" ? "gold" : "blue"}>
           {role.toUpperCase()}
         </Tag>
       ),
     },
     {
       title: "Actions",
       key: "actions",
       render: (_, record) => (
         <>
           <Button
             icon={<EditOutlined />}
             onClick={() => showEditModal(record)}
             className="mr-2"
           />
           <Popconfirm
             title="Are you sure to delete this user?"
             onConfirm={() => handleDelete(record._id)}
             okText="Yes"
             cancelText="No"
           >
             <Button icon={<DeleteOutlined />} danger />
           </Popconfirm>
         </>
       ),
     },
   ];

   return (
     <Layout style={{ minHeight: "100vh" }}>
       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
       <Layout>
         <Header collapsed={collapsed} setCollapsed={setCollapsed} />
         <Content className="m-4">
           <div className="p-6 bg-white rounded shadow">
             <Row gutter={16}>
               <Col span={12}>
                 <Card title="Total Users" bordered={false}>
                   {users.length}
                 </Card>
               </Col>
               <Col span={12}>
                 <Card title="Active Users" bordered={false}>
                   0
                 </Card>
               </Col>
             </Row>

             <div className="flex justify-between items-center mb-4 mt-6">
               <h2 className="text-xl font-semibold">Registered Users</h2>
               <Button type="primary" onClick={showModal} className="bg-black">
                 Add User
               </Button>
             </div>

             <Table
               dataSource={users.map((user, index) => ({
                 ...user,
                 key: index,
               }))}
               columns={userColumns}
               pagination={{ pageSize: 5 }}
             />

             {/* Add User Modal */}
             <Modal
               title="Add New User"
               open={isModalVisible}
               onCancel={handleCancel}
               footer={null}
             >
               <Form form={form} layout="vertical" onFinish={handleAddUser}>
                 <Form.Item
                   name="username"
                   label="Username"
                   rules={[{ required: true }]}
                 >
                   <Input />
                 </Form.Item>

                 <Form.Item
                   name="email"
                   label="Email"
                   rules={[{ required: true }]}
                 >
                   <Input />
                 </Form.Item>

                 <Form.Item
                   name="password"
                   label="Password"
                   rules={[{ required: true }]}
                 >
                   <Input.Password />
                 </Form.Item>

                 <Form.Item
                   name="confirmPassword"
                   label="Confirm Password"
                   dependencies={["password"]}
                   rules={[
                     {
                       required: true,
                       message: "Please confirm your password",
                     },
                     ({ getFieldValue }) => ({
                       validator(_, value) {
                         if (!value || getFieldValue("password") === value) {
                           return Promise.resolve();
                         }
                         return Promise.reject(
                           new Error("Passwords do not match")
                         );
                       },
                     }),
                   ]}
                 >
                   <Input.Password />
                 </Form.Item>


                 <Form.Item
                   name="role"
                   label="Role"
                   rules={[{ required: true }]}
                 >
                   <Select>
                     <Option value="user">User</Option>
                     <Option value="admin">Admin</Option>
                   </Select>
                 </Form.Item>

                 <Form.Item>
                   <Button
                     type="primary"
                     htmlType="submit"
                     className="bg-black w-full"
                   >
                     Add User
                   </Button>
                 </Form.Item>
               </Form>
             </Modal>

             {/* Edit User Modal */}
             <Modal
               title="Edit User"
               open={isEditModalVisible}
               onCancel={handleEditCancel}
               footer={null}
             >
               <Form
                 form={editForm}
                 layout="vertical"
                 onFinish={handleUpdateUser}
               >
                 <Form.Item
                   name="username"
                   label="Username"
                   rules={[{ required: true }]}
                 >
                   <Input />
                 </Form.Item>

                 <Form.Item
                   name="email"
                   label="Email"
                   rules={[{ required: true }]}
                 >
                   <Input />
                 </Form.Item>


                 <Form.Item
                   name="role"
                   label="Role"
                   rules={[{ required: true }]}
                 >
                   <Select>
                     <Option value="user">User</Option>
                     <Option value="admin">Admin</Option>
                   </Select>
                 </Form.Item>

                 <Form.Item>
                   <Button
                     type="primary"
                     htmlType="submit"
                     className="bg-black w-full"
                   >
                     Update User
                   </Button>
                 </Form.Item>
               </Form>
             </Modal>
           </div>
         </Content>
         <Footer className="text-center">
           Vehicle Service Management ©2025
         </Footer>
       </Layout>
     </Layout>
   );
 };

 export default Users;
