import React from "react";

const garageLocations = [
  {
    city: "New Delhi",
    garageName: "AutoFix Garage",
    address: "A-12, Sector 22, Dwarka, New Delhi, 110075",
    contact: "+91 9876543210",
  },
  {
    city: "Mumbai",
    garageName: "SpeedCare Auto",
    address: "Plot 44, Andheri West, Mumbai, Maharashtra, 400053",
    contact: "+91 9123456780",
  },
  {
    city: "Bangalore",
    garageName: "Metro Auto Garage",
    address: "12th Main, Indiranagar, Bangalore, Karnataka, 560038",
    contact: "+91 9988776655",
  },
  {
    city: "Chennai",
    garageName: "Southern Auto Works",
    address: "Anna Nagar, Block C, Chennai, Tamil Nadu, 600040",
    contact: "+91 8899776655",
  },
  {
    city: "Solan",
    garageName: "Hillside Motors",
    address: "Mall Road, Solan, Himachal Pradesh, 173212",
    contact: "+91 9876504321",
  },
  {
    city: "Shimla",
    garageName: "SnowPeak Garage",
    address: "Lakkar Bazar, Shimla, Himachal Pradesh, 171001",
    contact: "+91 9988221133",
  },
  {
    city: "Chandigarh",
    garageName: "Tricity Auto Zone",
    address: "Sector 17, Chandigarh, 160017",
    contact: "+91 9998877665",
  },
  {
    city: "Bilaspur",
    garageName: "Reliable Auto Hub",
    address: "Main Market, Bilaspur, Himachal Pradesh, 174001",
    contact: "+91 9811122334",
  },
];

const GarageLocations = () => {
  return (
    <div className="bg-black min-h-screen py-16 px-4 text-white">
      <h2 className="text-4xl font-extrabold text-center text-red-500 mb-14 decoration-red-700">
        Our Service Centers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
        {garageLocations.map((location, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-red-600 hover:border-red-500 transition-all duration-300 rounded-xl p-6 shadow-lg hover:shadow-red-700/40"
          >
            <h3 className="text-2xl font-semibold text-red-400 mb-1">
              {location.city}
            </h3>
            <p className="text-red-300 font-semibold mb-2">
              {location.garageName}
            </p>
            <p className="text-gray-300 text-sm mb-2">
              <strong className="text-white">Address:</strong> <br />
              {location.address}
            </p>
            <p className="text-gray-300 text-sm">
              <strong className="text-white">Contact:</strong>{" "}
              {location.contact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GarageLocations;
