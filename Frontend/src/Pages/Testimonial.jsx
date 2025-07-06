import React from "react";

const testimonials = [
  {
    name: "Donald Jackman",
    role: "Admin",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    review:
      "As an admin, I can easily monitor all users, bookings, and accessory listings. The dashboard is intuitive and secure.",
  },
  {
    name: "Richard Nelson",
    role: "Service Provider",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    review:
      "Managing appointments and updating service status is super simple. It keeps my work organized and professional.",
  },
  {
    name: "James Washington",
    role: "Vehicle Owner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    review:
      "Booking a service has never been easier. This platform saved me time and helped me track everything without any paperwork!",
  },
];

const Testimonial = () => {
    return (
      <div className="bg-black min-h-screen py-16 px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-red-500 mb-16 underline decoration-red-700">
          What People Say
        </h2>

        {/* Testimonial Cards */}
        <div className="flex flex-wrap justify-center gap-12">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-red-600 hover:border-red-400 transition duration-300 rounded-xl shadow-lg hover:shadow-red-700/40 w-80 px-6 py-8 relative"
            >
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                <img
                  className="h-24 w-24 rounded-full object-cover border-4 border-red-600 shadow-md"
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div className="mt-16 text-center">
                <h3 className="text-xl font-semibold text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-red-400 mb-4">{item.role}</p>
                <p className="text-gray-300 text-sm italic">"{item.review}"</p>
              </div>

              <div className="flex justify-center pt-4">
                <div className="text-red-500 text-lg space-x-0.5">★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
      
};

export default Testimonial;
