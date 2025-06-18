
import React from "react";
import { motion } from "framer-motion";
import image2 from "../assets/img2.jpg";

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const AboutUs = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative min-h-screen w-full text-white"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image2})`,
          filter: "brightness(50%)",
        }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 md:px-20 py-28">
        <motion.h2
          variants={childVariants}
          className="text-5xl font-bold text-red-500 mb-6"
        >
          About Us
        </motion.h2>

        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl max-w-3xl text-gray-200 leading-relaxed"
        >
          At <span className="text-red-400 font-semibold">EV-olution</span>, we
          don't just service vehicles — we elevate them. Rooted in innovation
          and fueled by passion, our mission is to bring next-gen automotive
          care to every doorstep. From combustion to electric, we understand
          your machine like no other.
        </motion.p>

        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl max-w-3xl text-gray-200 mt-6 leading-relaxed"
        >
          Whether it's routine maintenance, cutting-edge EV upgrades, or premium
          accessories — our expert team combines modern diagnostics with
          old-school dedication. We believe your car deserves more than service;
          it deserves excellence. Welcome to EV-olution — where performance
          meets precision.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AboutUs;


