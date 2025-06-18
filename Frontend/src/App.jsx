 import React from "react";
 import { createBrowserRouter, RouterProvider } from "react-router-dom";
 import Navbar from "./Components/Navbar";
 import Footer from "./Pages/Footer";
 import Home from "./Pages/Home";
 import AboutUs from "./Pages/AboutUs";
 import ContactUs from "./Pages/ContactUs";
 import Services from "./Pages/Services";
 import Accessories from "./Pages/Accessories";
 import NotFound from "./Pages/NotFound";
 import Login from "./Pages/Login";
 import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import ProductDetails from "./Pages/ProductDetails";
import AddAddress from "./Pages/AddAddress";
import Buy from "./Pages/Buy";
import MyOrders from "./Pages/MyOrders";
import ServiceDeatails from "./Pages/ServiceDeatails";
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },

    {
      path: "/aboutus",
      element: (
        <>
          <Navbar />
          <AboutUs />
          <Footer />
        </>
      ),
    },
    {
      path: "/contactus",
      element: (
        <>
          <Navbar />
          <ContactUs />
          <Footer />
        </>
      ),
    },

    {
      path: "/services",
      element: (
        <>
          <Navbar />
          <Services />
          <Footer />
        </>
      ),
    },

    {
      path: "/accessories",
      element: (
        <>
          <Navbar />
          <Accessories />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: <>{<Signup />}</>,
    },
    {
      path: "/forgot-password",
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/accessories/:category/:id",
      element: <ProductDetails />,
    },
    {
      path: "/add-address",
      element: (
        <div>
          <Navbar />
          <AddAddress />
          <Footer />
        </div>
      ),
    },
    {
      path: "/myorders/:id",
      element: (
        <div>
          <Navbar />
          <Buy />
          <Footer />
        </div>
      ),
    },
    {
      path: "/orders",
      element: (
        <div>
          <Navbar />
          <MyOrders />
          <Footer />
        </div>
      ),
    },
    {
      path: "/services/:id",
      element: (
        <div>
          <Navbar />
          <ServiceDeatails />
          <Footer />
        </div>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const App = () => {
    return (
      <div>
        <RouterProvider router={router} />
      </div>
    );
  };

  export default App;
