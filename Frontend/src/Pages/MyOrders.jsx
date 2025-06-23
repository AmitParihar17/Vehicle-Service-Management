import { useNavigate } from "react-router-dom";
import { baseURL } from "../../config";
import { UseAppContext } from "../Context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const { myOrders, userService } = UseAppContext();
  const navigate = useNavigate();

  if (
    !myOrders ||
    !userService ||
    myOrders.length === 0 ||
    userService.length === 0
  ) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        <p>You have not ordered anything yet.</p>
        <p
          className="mt-2 text-blue-500 underline cursor-pointer"
          onClick={() => navigate("/accessories")}
        >
          Start shopping now!
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 mt-20 md:px-10">
      <ToastContainer position="top-center" />

      {/* Header */}
      <div className="mb-8">
        <p className="text-3xl font-semibold uppercase">My Orders</p>
        <div className="w-20 h-1 bg-primary rounded-full mt-1"></div>
      </div>

      {/* Accessory Orders */}
      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl shadow-sm p-6 mb-8 bg-white md:mx-20"
        >
          <div className="flex justify-between text-gray-500 text-sm md:text-base mb-4 flex-wrap">
            <span>
              <strong>Order ID:</strong> {order._id}
            </span>
            <span>
              <strong>Total Amount:</strong> ₹{order.offerPrice}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-b border-gray-200">
            <div className="flex items-start md:items-center gap-4 w-full md:w-1/2">
              <img
                src={
                  order.productId?.images?.[0]?.url
                    ? `${baseURL}/${order.productId.images[0].url}`
                    : `${baseURL}/${order.productId?.images?.[0]}`
                }
                alt="Product"
                className="w-32 h-32 object-cover border rounded-md"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {order.productName}
                </h2>
                <p className="text-gray-500 text-sm">
                  Category: {order.category}
                </p>
              </div>
            </div>

            <div className="flex flex-col text-sm text-gray-600">
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentOption}
              </p>
            </div>

            <div className="text-right md:text-left">
              <p className="text-green-600 font-bold text-lg">
                Amount: ₹{order.offerPrice}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Services Booked */}
      <h2 className="text-2xl font-semibold mb-4 mt-12">Services Picked</h2>

      {userService.map((service, index) => {
        const selectedServices = service.selectedServices || [];

        const totalPrice = selectedServices.reduce(
          (sum, s) => sum + (s?.price || 0),
          0
        );

        return (
          <div
            key={index}
            className="border border-gray-300 rounded-xl shadow-sm p-6 mb-8 bg-white md:mx-20"
          >
            <div className="flex justify-between text-gray-500 text-sm md:text-base mb-4 flex-wrap">
              <span>
                <strong>Order ID:</strong> {service._id}
              </span>
              <span>
                <strong>Total Amount:</strong> ₹{service.totalPrice}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t pt-4">
              {selectedServices.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-2 border rounded-md shadow-sm"
                >
                  <img
                    src={
                      s?.images?.[0]?.url
                        ? `${baseURL}/${s.images[0].url}`
                        : s?.images?.[0]
                        ? `${baseURL}/${s.images[0]}`
                        : "/default-service.jpg"
                    }
                    alt={s?.servicePrice || "Service"}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {s?.serviceName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ₹{s?.servicePrice || "--"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Status:</strong> {service.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(service.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
