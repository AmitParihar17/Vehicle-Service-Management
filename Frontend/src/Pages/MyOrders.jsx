import { useNavigate } from "react-router-dom";
import { baseURL } from "../../config";
import { UseAppContext } from "../Context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const { myOrders } = UseAppContext();
  const navigate = useNavigate();

  if (!myOrders || myOrders.length === 0) {
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
    <div className="px-4 py-10 md:px-10">
      <ToastContainer position="top-center" />
      <div className="mb-8">
        <p className="text-3xl font-semibold uppercase">My Orders</p>
        <div className="w-20 h-1 bg-primary rounded-full mt-1"></div>
      </div>

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
    </div>
  );
};

export default MyOrders;
