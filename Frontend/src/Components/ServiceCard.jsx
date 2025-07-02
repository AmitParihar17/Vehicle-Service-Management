import React from "react";
import { assets } from "../assets/assets";
import { UseAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const ServiceCard = ({ service }) => {
  const {
    currency,
  } = UseAppContext();
  const navigate = useNavigate()
  return (
    service && (
      <div
        onClick={() => {
          navigate(`/services/${service._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full "
      >
        <ToastContainer />
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36 "
            src={service.images?.[0]?.url}
            alt={service.serviceName}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p>{service.approxTime}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {service.serviceName}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  className="md:w-3.5 w-3"
                />
              ))}
            <p>(4)</p>
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-primary">
              {currency}Rs {service.servicePrice}{" "}
            </p>
            <div
              className="text-primary"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                className="flex items-center justify-center gap-1 cursor-pointer bg-primary/10 border border-primary/40 md:w-[100px] w-[64px] h-[34px] rounded"
                onClick={() => {
                  navigate(`/services/${service._id}`);
                  scrollTo(0, 0);
                }}
              >
                <img src={assets.cart_icon} alt="book now" />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ServiceCard;