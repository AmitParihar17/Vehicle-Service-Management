 

import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Services from "./Services";

const headingWords = ["Drive", "smart,", "Service", "smarter"];

const HomePage = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center min-h-screen bg-cover bg-center text-white text-center px-4"
        style={{
          backgroundImage: "url(src/assets/img1.jpg)",
        }}
      >
        <div className="p-8 w-full max-w-3xl">
          <div className="text-5xl md:text-7xl font-bold mb-4 flex flex-wrap justify-center gap-2">
            {headingWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.5 }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="text-lg md:text-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: headingWords.length * 0.3 + 0.5 }}
          >
            Your trusted partner for car maintenance, repairs, and accessories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: headingWords.length * 0.3 + 1 }}
          >
            <NavLink
              to="/services"
              className="bg-red-600 text-white py-2 px-4 rounded-lg text-2xl md:text-xl font-semibold hover:bg-red-700 transition duration-300"
            >
              Explore Services
            </NavLink>
          </motion.div>
        </div>
      </motion.div>

      <AboutUs />
      <ContactUs />
      <Services />
    </>
  );
};

export default HomePage;
