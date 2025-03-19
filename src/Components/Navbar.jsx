
// import React from "react";
// import logo from "./assets/logo.png";
// import { NavLink } from "react-router-dom";
// import "./Navbar.css";


// const Navbar = () => {
//   return (
//     <>
//       <div className="w-full flex justify-evenly items-center p-2 shadow-[5px_5px_5px_rgba(15,_11,_11,_0.501)]">
//         <div className="w-1/5">
//           <img className="w-[150px]" src={logo} alt="logo" />
//         </div>
//         <div className="flex justify-evenly items-center gap-[60px]">
//           <ul className="flex justify-evenly items-center gap-[60px]">
//             <li className="list-none ">
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive
//                     ? " bg-black text-white py-2 px-3 rounded-[12px] items-center "
//                     : ""
//                 }
//                 to={"/"}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li className="list-none">
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive
//                     ? "  bg-black text-white p-[10px] rounded-[12px]"
//                     : ""
//                 }
//                 to={"/aboutus"}
//               >
//                 About Us
//               </NavLink>
//             </li>
//             <li className="list-none">
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive
//                     ? "  bg-black text-white  p-[10px] rounded-[12px]"
//                     : ""
//                 }
//                 to={"/contactus"}
//               >
//                 Contact Us
//               </NavLink>
//             </li>
//             <li className="list-none">
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive
//                     ? "  bg-black text-white  p-[10px] rounded-[12px]"
//                     : ""
//                 }
//                 to={"/services"}
//               >
//                 Services
//               </NavLink>
//             </li>
//             <li className="list-none">
//               <NavLink
//                 className={({ isActive }) =>
//                   isActive
//                     ? "  bg-black text-white  p-[10px] rounded-[12px]"
//                     : ""
//                 }
//                 to={"/accessories"}
//               >
//                 Accessories
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//         <div className="flex items-center">
//           <NavLink
//             to="/login"
//             className={({ isActive }) =>
//               isActive ? "text-black border-2  py-2 px-4 rounded-[12px] " : "bg-black text-white py-2 px-4 rounded-2xl"
//             }
//           >
//             Login
//           </NavLink>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

 

 import React from "react";
 import logo from "./assets/logo.png";
 import { NavLink } from "react-router-dom";
 import "./Navbar.css";
import AboutUs from "../Pages/AboutUs";

 const Navbar = () => {
   return (
     <>
       <div className="w-full flex justify-evenly items-center p-2 shadow-md bg-blue-400 text-white">
         <div className="w-1/5">
           <img className="w-[150px]" src={logo} alt="logo" />
         </div>
         <div className="flex justify-evenly items-center gap-[60px]">
           <ul className="flex justify-evenly items-center gap-[60px]">
             <li className="list-none">
               <NavLink
                 className={({ isActive }) =>
                   isActive
                     ? "bg-white text-blue-600 py-2 px-3 rounded-[12px] items-center"
                     : "hover:text-gray-200"
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
                     ? "bg-white text-blue-600 p-[10px] rounded-[12px]"
                     : "hover:text-gray-200"
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
                     ? "bg-white text-blue-600 p-[10px] rounded-[12px]"
                     : "hover:text-gray-200"
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
                     ? "bg-white text-blue-600 p-[10px] rounded-[12px]"
                     : "hover:text-gray-200"
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
                     ? "bg-white text-blue-600 p-[10px] rounded-[12px]"
                     : "hover:text-gray-200"
                 }
                 to={"/accessories"}
               >
                 Accessories
               </NavLink>
             </li>
           </ul>
         </div>
         <div className="flex items-center">
           <NavLink
             to="/login"
             className={({ isActive }) =>
               isActive
                 ? "text-blue-600 border-2 border-white py-2 px-4 rounded-[12px]"
                 : "bg-white text-blue-600 py-2 px-4 rounded-2xl hover:bg-gray-200"
             }
           >
             Login
           </NavLink>
         </div>
       </div>
     </>
   );
 };

 export default Navbar;






  