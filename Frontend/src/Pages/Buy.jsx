import { useEffect, useState } from "react";
import { UseAppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Buy = () => {
  const {
    products,
    addresses,
    selectedAddress,
    setselectedAddress,
    placeOrder,
  } = UseAppContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find((item) => item._id === id);
      setProduct(found);
    }
  }, [id, products]);

  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("Online");

  if (!product) {
    return (
      <div className="mt-24 text-center text-xl font-medium text-red-500">
        Loading product or product not found...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-22 m-10">
      <ToastContainer position="top-center" />
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-indigo-500">1 item</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
          <div className="flex items-center md:gap-6 gap-3">
            <div
              onClick={() =>
                navigate(
                  `/products/${product.category.toLowerCase()}/${product._id}`
                )
              }
              className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
            >
              <img
                className="max-w-full h-full object-cover"
                src={product.images?.[0]?.url || product.images?.[0]}
                alt={product.name}
              />
            </div>
            <div>
              <p className="hidden md:block font-semibold">{product.name}</p>
            </div>
          </div>
          <p className="text-center">Rs {product.offerPrice}</p>
          <button
            className="cursor-pointer mx-auto"
            onClick={() => navigate("/")}
          >
            ❌
          </button>
        </div>

        <button
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
          onClick={() => navigate("/")}
        >
          Back to Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {Array.isArray(addresses) &&
                  addresses.length > 0 &&
                  addresses.map((address, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center px-2"
                    >
                      <p
                        onClick={() => {
                          setselectedAddress(address);
                          setShowAddress(false);
                        }}
                        className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {address.street}, {address.city}, {address.state}
                      </p>
                    </div>
                  ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            value={paymentOption}
          >
            <option value="COD">Cash On Delivery</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs {product.offerPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </p>
          <p className="flex justify-between text-indigo-600 font-medium">
            <span>Total</span>
            <span>Rs {product.offerPrice}</span>
          </p>
        </div>

        <button
          onClick={() =>
            {placeOrder(
              "COD",
              product._id,
              product.productName,
              product.category,
              product.offerPrice
            ),navigate("/orders")}
          }
          className="bg-indigo-600 rounded px-3 py-2 mt-6 text-white w-full"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Buy;
