 import React from "react";

 const Services = () => {
   const services = [
     {
       name: "Car Wash",
       description:
         "Complete exterior and interior car wash to keep your car clean and fresh.",
     },
     {
       name: "Oil Change",
       description:
         "High-quality oil change service to ensure smooth engine performance.",
     },
     {
       name: "Tire Replacement",
       description:
         "Expert tire replacement and alignment services for a smooth drive.",
     },
     {
       name: "Brake Inspection",
       description:
         "Comprehensive brake inspection and repair services for safety.",
     },
     {
       name: "Battery Check",
       description: "Thorough battery check and replacement services.",
     },
     {
       name: "AC Repair",
       description: "Professional air conditioning repair and maintenance.",
     },
   ];

   return (
     <div className="min-h-screen bg-gray-100 p-8">
       <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">
         Our Services
       </h2>
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {services.map((service, index) => (
           <div
             key={index}
             className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
           >
             <h3 className="text-2xl font-semibold text-blue-600 mb-2">
               {service.name}
             </h3>
             <p className="text-gray-700">{service.description}</p>
           </div>
         ))}
       </div>
     </div>
   );
 };

 export default Services;

