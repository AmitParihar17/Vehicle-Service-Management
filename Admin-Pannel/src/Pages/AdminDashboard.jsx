 import React, { useState, useEffect } from "react";
 import { Layout, Breadcrumb, message, Card, Row, Col } from "antd";
 import axios from "axios";

 import Sidebar from "../Components/Sidebar";
 import Header from "../Components/Header";

 const { Content, Footer } = Layout;

 const AdminDashboard = () => {
   const [collapsed, setCollapsed] = useState(false);
   const [customers, setCustomers] = useState([]);
   const [services, setServices] = useState([]);

   useEffect(() => {
     const fetchData = async () => {
       try {
         const customersRes = await axios.get(
           "http://localhost:5001/api/auth/users"
         );
         setCustomers(customersRes.data);

         const servicesRes = await axios.get(
           "http://localhost:5001/api/services"
         );
         setServices(servicesRes.data);
       } catch (error) {
         console.error("Failed to fetch data", error);
         message.error("Failed to load dashboard data.");
       }
     };

     fetchData();
   }, []);

   return (
     <Layout style={{ minHeight: "100vh" }}>
       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

       <Layout>
         <Header collapsed={collapsed} setCollapsed={setCollapsed} />

         <Content className="m-4">
           <Breadcrumb style={{ marginBottom: 16 }}>
             <Breadcrumb.Item>Home</Breadcrumb.Item>
             <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
           </Breadcrumb>

           <div className="p-6 bg-white rounded shadow">
             <Row gutter={16}>
               <Col span={12}>
                 <Card title="Total Customers" bordered={false}>
                   {customers.length}
                 </Card>
               </Col>
               <Col span={12}>
                 <Card title="Total Services" bordered={false}>
                   {services.length}
                 </Card>
               </Col>
             </Row>
           </div>
         </Content>

         <Footer className="text-center">
           Vehicle Service Management ©2025
         </Footer>
       </Layout>
     </Layout>
   );
 };

 export default AdminDashboard;
