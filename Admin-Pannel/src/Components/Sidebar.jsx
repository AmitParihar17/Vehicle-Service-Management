import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  CarOutlined,
  CustomerServiceOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const getSelectedKeys = () => {
    const path = location.pathname;

    if (path.includes("/dashboard/users")) return ["2"];
    if (path.includes("/dashboard/upload-service")) return ["3"];
    if (path.includes("/dashboard/upload")) return ["4"];
    if (path.includes("/dashboard/manage-orders")) return ["5"];
    if (path.includes("/dashboard/settings")) return ["6"];
    if (path.includes("/dashboard/products")) return ["7"];
    return ["1"];
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      collapsedWidth="80"
      className="!bg-black"
    >
      <div className="flex justify-center items-center py-4">
        <span
          className={`text-white font-bold text-lg ${
            collapsed ? "hidden" : ""
          }`}
        >
          <span className="text-red-500">EV</span>-olution
        </span>
      </div>

      <Menu theme="dark" mode="inline" selectedKeys={getSelectedKeys()}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <NavLink to="/dashboard/users">Users</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<CarOutlined />}>
          <NavLink to="/dashboard/upload-service">Upload-Service</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<CustomerServiceOutlined />}>
          <NavLink to="/dashboard/upload">Upload Accessories</NavLink>
        </Menu.Item>
        <Menu.Item key="5" icon={<ShoppingOutlined />}>
          <NavLink to="/dashboard/manage-orders">Manage Orders</NavLink>
        </Menu.Item>
        <Menu.Item key="6" icon={<SettingOutlined />}>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </Menu.Item>
        <Menu.Item key="7" icon={<ShoppingOutlined />}>
          <NavLink to="/dashboard/products">See Products</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
