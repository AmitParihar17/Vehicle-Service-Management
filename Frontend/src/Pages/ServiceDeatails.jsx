import React, { useEffect, useState } from "react";
import { UseAppContext } from "../Context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ServiceCard from "../Components/ServiceCard";
import axiosInstance from "../../axiosInstance";
import { baseURL } from "../../config";
import { toast, ToastContainer } from "react-toastify";

const ServiceDetails = () => {
  const { services } = UseAppContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [relatedservice, setrelatedservice] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [openForm, setopenForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const service = services.find((item) => item._id === id);

  useEffect(() => {
    if (services.length > 0 && service) {
      const productCopy = services.slice();
      setrelatedservice(productCopy.slice(0, 5));
      setSelectedServices([service._id]); // default checked
    }
  }, [services, service]);

  useEffect(() => {
    setThumbnail(service?.images?.[0]?.url || null);
  }, [service]);

  const handleservicebooking = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    try {
      const formData = { name, phone, date, time, selectedServices };

      const response = await axiosInstance.post(
        `${baseURL}/api/service/book`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/orders");
          scrollTo(0, 0);
        }, 5000);
        setopenForm(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    service && (
      <div className="mx-20 my-20">
        <ToastContainer position="top-center" />
        <div className="font-medium text-2xl">Service Details</div>
        <p>
          <Link to={"/"}>Home</Link> /
          <Link to={"/accessories"}>Accessories</Link> /
          <span className="text-indigo-500"> {service.serviceName}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {service.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(img.url)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={img.url} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img src={thumbnail} alt="Selected product" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{service.serviceName}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    className="md:w-4 w-3.5"
                    alt="star"
                  />
                ))}
              <p className="text-base ml-2">(4)</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: Rs{service.servicePrice}
              </p>
              <p className="text-2xl font-medium">
                MRP: Rs {service.servicePrice}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="font-medium mt-6 text-2xl">About Service</p>
            <ul className="list-disc ml-4 text-gray-500 text-2xl">
              {Array.isArray(service.serviceDescription)
                ? service.serviceDescription.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))
                : service.serviceDescription
                    .split(".")
                    .map(
                      (line, index) =>
                        line.trim() && <li key={index}>{line.trim()}.</li>
                    )}
            </ul>
            <div className="my-3 text-xl">
              <span className="text-xl font-medium">Contact No </span>{" "}
              {service.contact}
            </div>
            <div className="my-3 text-xl">
              <span className="text-xl font-medium">Approximate Time </span>{" "}
              {service.approxTime}
            </div>
            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => setopenForm(true)}
                className="w-40 py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
              >
                Schedule a service
              </button>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <div className="flex flex-col items-center mt-16">
          <div className="flex flex-col items-center w-max">
            <p className="text-3xl font-medium">Other Services</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-8">
            {relatedservice.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
          <button
            className="mx-auto px-12 my-16 py-2.5 border rounded text-primary cursor-pointer hover:bg-primary/10 transition"
            onClick={() => {
              navigate("/services");
              scrollTo(0, 0);
            }}
          >
            See More
          </button>
        </div>

        {/* Booking Form */}
        {openForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
              <button
                onClick={() => setopenForm(false)}
                className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-red-500"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">
                Schedule Service
              </h2>
              <form
                onSubmit={handleservicebooking}
                className="flex flex-col gap-4"
              >
                <input type="hidden" name="serviceId" value={service._id} />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                  pattern="[6-9]{1}[0-9]{9}"
                  minLength={10}
                  maxLength={10}
                  className="border p-2 rounded"
                />
                {/* Date Picker: only today to next 10 days */}
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  max={
                    new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                  className="border p-2 rounded"
                />

                {/* Time Picker: 08:00 to 19:00 (7PM) */}
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  min="08:00"
                  max="19:00"
                  step="900" // 15 minute intervals
                  className="border p-2 rounded"
                />

                <div>
                  <label className="block font-medium mb-1">
                    Select Services:
                  </label>
                  <div className="max-h-40 overflow-y-auto border p-2 rounded flex flex-col gap-1">
                    {services.map((srv) => (
                      <label key={srv._id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={srv._id}
                          checked={selectedServices.includes(srv._id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                              setSelectedServices([
                                ...selectedServices,
                                srv._id,
                              ]);
                            } else {
                              setSelectedServices(
                                selectedServices.filter((id) => id !== srv._id)
                              );
                            }
                          }}
                        />
                        {srv.serviceName}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ServiceDetails;
