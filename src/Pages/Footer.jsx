 import React from "react";
 import { NavLink } from "react-router-dom";
 import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

 const Footer = () => {
   return (
     <footer className="bg-gray-900 text-white py-8 w-full">
       <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
         {/* Logo and Description */}
         <div className="text-center md:text-left mb-4 md:mb-0">
           <h2 className="text-2xl font-bold">Auto Service</h2>
           <p className="text-gray-400 text-sm">
             Your trusted partner for car maintenance and repairs.
           </p>
         </div>

         {/* Navigation Links */}
         <div className="flex gap-6 text-sm">
           <NavLink to="/" className="hover:text-blue-400">
             Home
           </NavLink>
           <NavLink to="/aboutus" className="hover:text-blue-400">
             About Us
           </NavLink>
           <NavLink to="/services" className="hover:text-blue-400">
             Services
           </NavLink>
           <NavLink to="/contactus" className="hover:text-blue-400">
             Contact Us
           </NavLink>
         </div>

         {/* Social Media Icons */}
         <div className="flex gap-4 mt-4 md:mt-0">
           <Facebook className="text-gray-400 hover:text-blue-500 cursor-pointer" />
           <Twitter className="text-gray-400 hover:text-blue-400 cursor-pointer" />
           <Instagram className="text-gray-400 hover:text-pink-500 cursor-pointer" />
           <Linkedin className="text-gray-400 hover:text-blue-600 cursor-pointer" />
         </div>
       </div>

       {/* Copyright */}
       <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
         &copy; {new Date().getFullYear()} Auto Service. All Rights Reserved.
       </div>
     </footer>
   );
 };

 export default Footer;