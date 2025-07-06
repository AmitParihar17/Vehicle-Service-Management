import React from "react";
import { assets } from "../assets/assets";
import { UseAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ServiceCard = ({ service }) => {
  const { currency } = UseAppContext();
  const navigate = useNavigate();

  return (
    service && (
      <div
        onClick={() => {
          navigate(`/services/${service._id}`);
          scrollTo(0, 0);
        }}
        className="border border-red-500/30 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full shadow-md hover:shadow-red-200 transition"
      >
        <ToastContainer />
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={service.images?.[0]?.url}
            alt={service.serviceName}
          />
        </div>
        <div className="text-gray-600 text-sm mt-2">
          <p className="text-xs text-red-500 mb-1">{service.approxTime}</p>
          <p className="text-black text-base font-semibold truncate w-full">
            {service.serviceName}
          </p>
          <div className="flex items-center gap-0.5 my-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  className="md:w-4 w-3"
                  alt="rating"
                />
              ))}
            <p className="text-xs text-gray-500">(4)</p>
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-lg text-base font-bold text-red-600">
              {currency}Rs {service.servicePrice}
            </p>
            <div
              className="text-red-600"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                className="flex items-center justify-center gap-1 cursor-pointer bg-red-100 border border-red-300 md:w-[100px] w-[80px] h-[34px] rounded hover:bg-red-200 transition"
                onClick={() => {
                  navigate(`/services/${service._id}`);
                  scrollTo(0, 0);
                }}
              >
                <img src={assets.cart_icon} alt="cartIcon" />
                <span className="text-xs font-medium">Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ServiceCard;
