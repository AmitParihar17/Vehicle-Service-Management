 import React, { useState } from "react";
 import { Layout } from "antd";
 import Sidebar from "./Sidebar";
 import Header from "./Header"; // Assuming you want a Header component for Vehicle Service Management

 const { Content } = Layout;

 const DashboardLayout = ({ children }) => {
   const [collapsed, setCollapsed] = useState(false);

   return (
     <Layout style={{ minHeight: "100vh" }}>
       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
       <Layout>
         <Header collapsed={collapsed} setCollapsed={setCollapsed} />
         <Content style={{ margin: "16px" }}>
           {/* You can adjust this part to reflect vehicle service management-specific content */}
           <div className="dashboard-content">{children}</div>
         </Content>
       </Layout>
     </Layout>
   );
 };

 export default DashboardLayout;
