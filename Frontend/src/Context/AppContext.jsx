import React, { useState,createContext } from "react";
import axiosInstance from "../../axiosInstance";
import { baseURL } from "../../config";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";



 const AppContext = createContext()

export  const AppProvider = ({children})=>{
  const [products, setproducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);
  const [myOrders, setmyOrders] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/api/product/allproducts`
      );
      if (response.data.success) {
        const modifiedProducts = response.data.data.map((product) => ({
          ...product,
          images: product.images.map((img) => ({
            url: `${baseURL}/${img.url}`,
          })),
        }));
        setproducts(modifiedProducts);
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(storedUser);
      fetchaddress(storedUser);
      fetchOrders()
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setselectedAddress] = useState(null);
  const fetchaddress = async (user) => {
    try {
      const userId = user.id;
      console.log(userId);
      const response = await axiosInstance.get(
        `${baseURL}/api/Address/getaddress`,
        { params: { userId } }
      );
      if (response.data.success) {
        console.log("address fetched");
        setAddresses(response.data.address);
        setselectedAddress(response.data.address[0]);
        console.log(response.data.address);
      }
    } catch (err) {
      console.log(err);
    }
  };
 
  const placeOrder = async (
    paymentOption,
    productId,
    productName,
    category,
    offerPrice
  ) => {
    if (!selectedAddress) {
      toast.error("Please enter an address");
      return;
    }

    const address = selectedAddress;

    console.log(
      "Placing order...",
      paymentOption,
      productId,
      productName,
      category,
      offerPrice,
      address
    );

    try {
      const response = await axiosInstance.post(`${baseURL}/api/order/order`, {
        paymentOption,
        productId,
        productName,
        category,
        offerPrice,
        address,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data.message)
        fetchOrders();
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
      console.log(err?.message);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(`${baseURL}/api/order/myorders`);
      if (response.data.success) {
        console.log(response.data.message);
        setmyOrders(response.data.orders);
      }
    } catch (err) {
      console.log(err?.message);
    }
  };
  const [services,setservices] = useState([])
  const fetchService = async ()=>{
    try{
      const response = await axiosInstance.get(`${baseURL}/api/service/all`)
      if(response.data.success){
        const modifiedServices = response.data.services.map((service) => ({
          ...service,
          images: service.images.map((img) => ({
            url: `${baseURL}/${img.url}`,
          })),
        }));
        setservices(modifiedServices)
        console.log(modifiedServices)
        console.log(services)
      }
    }catch(err){
      console.log(err.response.data.message)
    }
  }
  useEffect(() => {
    console.log("🟢 services state updated:", services);
  }, [services]);
  useEffect(()=>{
     fetchService()
  },[])
  const [userService,setuserService] = useState([])
  const fetchepickedService = async()=>{
       try {
          const response = await axiosInstance.get(`${baseURL}/api/service/user`)
          setuserService(response.data.service)
          console.log(response.data.message)
       } catch (error) {
           console.log(error.message)
       }
  }
  useEffect(()=>{
    fetchepickedService()
  },[user])
  const value = {
    products,
    user,
    login,
    logout,
    fetchaddress,
    setAddresses,
    selectedAddress,
    placeOrder,
    fetchOrders,
    myOrders,
    services,
    userService,
    fetchepickedService,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const UseAppContext =  ()=> React.useContext(AppContext)