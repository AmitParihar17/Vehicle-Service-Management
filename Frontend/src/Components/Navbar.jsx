import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UseAppContext } from "../Context/AppContext";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const {logout} = UseAppContext()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    logout()
    navigate("/");
  };


  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        My Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-4 backdrop-blur-lg bg-black/50 text-white shadow-lg">
    
      <div className="font-outfit text-3xl font-bold tracking-wide">
        <span className="text-red-500">EV</span>-olution
      </div>

     
      <div className="flex items-center gap-12">
        <ul className="flex items-center text-lg gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold"
                  : "hover:text-red-300 transition-colors"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold"
                  : "hover:text-red-300 transition-colors"
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold"
                  : "hover:text-red-300 transition-colors"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold"
                  : "hover:text-red-300 transition-colors"
              }
            >
              Accessories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactus"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold"
                  : "hover:text-red-300 transition-colors"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

       
        {isAuthenticated ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Avatar icon={<UserOutlined />} className="cursor-pointer" />
          </Dropdown>
        ) : (
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "bg-red-500 text-white font-semibold py-2 px-5 rounded-3xl shadow"
                : "bg-red-600 text-white font-semibold py-2 px-5 rounded-3xl hover:bg-red-500 transition-colors"
            }
          >
            Sign Up
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
