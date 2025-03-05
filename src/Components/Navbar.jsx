// import React from 'react'
// import logo from './assets/logo.png'
// import { NavLink } from 'react-router'
// import './Navbar.css'

// const Navbar = () => {
//   return (
//     <>
//       <div className="container">
//         <div className="logo">
//           <img className="logo-img" src={logo} alt="logo" />
//         </div>
//         <div className="nav-link">
//           <ul>
//             <li>
//               <NavLink
//                 className={({ isActive }) => (isActive ? "active-link" : "")}
//                 to={"/"}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 className={({ isActive }) => (isActive ? "active-link" : "")}
//                 to={"/aboutus"}
//               >
//                 About Us
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 className={({ isActive }) => (isActive ? "active-link" : "")}
//                 to={"/contactus"}
//               >
//                 Contact Us
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 className={({ isActive }) => (isActive ? "active-link" : "")}
//                 to={"/services"}
//               >
//                 Services
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 className={({ isActive }) => isActive ? "active-link" : ""}
//                 to="/accessories"
//               >
//                 Accessories
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//         <div className="btn">
//           <button className="signup-btn">SignUp</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar




import React from "react";
import logo from "./assets/logo.png";
import { NavLink } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  return (
    <>
      <div className="w-full flex justify-evenly items-center p-2 shadow-[5px_5px_5px_rgba(15,_11,_11,_0.501)]">
        <div className="w-1/5">
          <img className="w-[150px]" src={logo} alt="logo" />
        </div>
        <div className="flex justify-evenly items-center gap-[60px]">
          <ul className="flex justify-evenly items-center gap-[60px]">
            <li className="list-none ">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? " bg-black text-white py-2 px-3 rounded-[12px] items-center "
                    : ""
                }
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "  bg-black text-white p-[10px] rounded-[12px]"
                    : ""
                }
                to={"/aboutus"}
              >
                About Us
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "  bg-black text-white  p-[10px] rounded-[12px]"
                    : ""
                }
                to={"/contactus"}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "  bg-black text-white  p-[10px] rounded-[12px]"
                    : ""
                }
                to={"/services"}
              >
                Services
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "  bg-black text-white  p-[10px] rounded-[12px]"
                    : ""
                }
                to={"/accessories"}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <button className="w-[85px] h-[40px] cursor-pointer rounded-[12px]   border-2 hover:bg-[#000000] hover:text-white">
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;





 
