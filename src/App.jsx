 import React from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Services from './Pages/Services';
import Accessories from './Pages/Accessories';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Footer from './Pages/Footer';

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
     path: "*",
     element: <NotFound />,
   },
 ]);
 
 const App = () => {
   return (
     <div>
        <RouterProvider  router ={router} />
     </div>
   )
 }
 
 export default App
 
