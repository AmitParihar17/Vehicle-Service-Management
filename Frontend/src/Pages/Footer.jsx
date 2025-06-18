 import React from "react";
 import { Link } from "react-router-dom";
 import {
   FaFacebookF,
   FaInstagram,
   FaTwitter,
   FaTools,
   FaCarBattery,
 } from "react-icons/fa";

 const Footer = () => {
   return (
     <footer className="bg-gray-900 text-white pt-10 pb-6 px-6 md:px-20">
       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
         {/* Logo & About */}
         <div>
           <h2 className="text-2xl font-bold text-red-500 mb-4">EV-olution</h2>
           <p className="text-sm text-gray-400">
             Your trusted partner in smart vehicle service, EV care, and
             cutting-edge accessories.
           </p>
         </div>

         {/* Quick Links */}
         <div>
           <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
           <ul className="space-y-2 text-gray-300 text-sm">
             <li>
               <Link to="/" className="hover:text-red-400">
                 Home
               </Link>
             </li>
             <li>
               <Link to="/about" className="hover:text-red-400">
                 About Us
               </Link>
             </li>
             <li>
               <Link to="/services" className="hover:text-red-400">
                 Services
               </Link>
             </li>
             <li>
               <Link to="/contact" className="hover:text-red-400">
                 Contact
               </Link>
             </li>
           </ul>
         </div>

         {/* Services */}
         <div>
           <h3 className="text-lg font-semibold mb-3">Our Services</h3>
           <ul className="space-y-2 text-gray-300 text-sm">
             <li className="flex items-center gap-2">
               <FaTools /> Maintenance & Repair
             </li>
             <li className="flex items-center gap-2">
               <FaCarBattery /> EV Upgrades
             </li>
             <li className="flex items-center gap-2">⚙ Accessories</li>
             <li className="flex items-center gap-2">🛠 Diagnostics</li>
           </ul>
         </div>

         {/* Social Media */}
         <div>
           <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
           <div className="flex gap-4 mt-2 text-gray-300">
             <a
               href="https://www.facebook.com/pisoftsolutions"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:text-blue-500"
             >
               <FaFacebookF />
             </a>
             <a
               href="https://www.instagram.com/pisoft_official"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:text-pink-400"
             >
               <FaInstagram />
             </a>
             <a
               href="https://twitter.com/pisoftdevs"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:text-blue-300"
             >
               <FaTwitter />
             </a>
           </div>
         </div>
       </div>

       {/* Bottom */}
       <div className="text-center text-sm text-gray-500 mt-6">
         &copy; {new Date().getFullYear()} EV-olution. All rights reserved.
       </div>
     </footer>
   );
 };

 export default Footer;
