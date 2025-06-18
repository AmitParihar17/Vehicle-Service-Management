  
 import React from "react";
 import Lottie from "lottie-react";
 import notFoundAnimation from "../assets/Animation404.json";
 import { Link } from "react-router-dom";

 const NotFound  = () => {
   return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
       <Lottie
         animationData={notFoundAnimation}
         loop={true}
         style={{ height: 300 }}
       />

       <h1 className="text-3xl font-bold mt-4 text-red-600">
         Oops! Page not found
       </h1>
       <p className="text-gray-600 mt-2 mb-6">
         We can't seem to find the page you're looking for.
       </p>

       <Link
         to="/dashboard"
         className="text-white underline underline-offset-4 hover:text-red-600 transition duration-300 text-base font-medium border-2 border-black p-2 rounded-2xl bg-black"
       >
         Oops! Let’s Go Home 🚗
       </Link>
     </div>
   );
 };

 export default NotFound;

