 import React from "react";
import Footer from "./Footer";

 const AboutUs = () => {
   return (
     <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
       <div className="max-w-3xl text-center">
         <h2 className="text-3xl font-bold text-blue-600 mb-4">About Us</h2>
         <p className="text-gray-700 mb-6">
           Welcome to <span className="font-semibold">AutoCare Solutions</span>,
           your trusted partner for all your vehicle service needs. With years
           of experience in the auto industry, we specialize in providing
           high-quality maintenance and repair services to keep your car running
           smoothly. Our team of certified mechanics is dedicated to delivering
           top-notch services with transparency and reliability.
         </p>
         <h3 className="text-2xl font-semibold text-blue-500 mb-3">
           Our Services
         </h3>
         <ul className="text-gray-700 list-disc list-inside mb-6">
           <li>Comprehensive Car Maintenance</li>
           <li>Oil Change & Engine Diagnostics</li>
           <li>Tire Alignment & Replacement</li>
           <li>Brake & Suspension Repairs</li>
           <li>Auto Detailing & Cleaning</li>
         </ul>
         <h3 className="text-2xl font-semibold text-blue-500 mb-3">
           Why Choose Us?
         </h3>
         <p className="text-gray-700 mb-6">
           We believe in providing exceptional service with customer
           satisfaction as our priority. Our state-of-the-art equipment and
           skilled professionals ensure that your vehicle receives the best care
           possible. We offer competitive pricing, quick turnaround times, and a
           hassle-free experience for all our customers.
         </p>
         <p className="text-gray-900 font-semibold">
           Visit us today and experience the difference!
         </p>
       </div>
     </div>
   );
 };

 export default AboutUs;

