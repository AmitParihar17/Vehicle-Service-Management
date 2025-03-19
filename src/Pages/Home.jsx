 import React from "react";
  import { NavLink } from "react-router-dom";
import AboutUs from "./AboutUs";
import { Contact } from "lucide-react";
import ContactUs from "./ContactUs";
import Services from "./Services";

  const HomePage = () => {
    return (
      <>
        <div
          className="flex items-center justify-center min-h-screen bg-cover bg-center text-white text-center px-4"
          style={{
            backgroundImage: "url(src/Components/assets/carservice.jpg)",
          }}
        >
          <div className="p-8 w-full max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              Welcome to Car Care
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Your trusted partner for car maintenance, repairs, and
              accessories.
            </p>
            <NavLink
              to="/aboutus"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg md:text-xl font-semibold hover:bg-blue-700 transition duration-300"
            >
              Read More
            </NavLink>
          </div>
          
        </div>
      <AboutUs />
      <ContactUs/>
      <Services/>
      </>
    );
  };

  export default HomePage;

