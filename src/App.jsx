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

 const router = createBrowserRouter([
   {
     path: "/",
     element: (
       <>
         <Navbar />
         <Home />
       </>
     ),
   },

   {
     path: "/aboutus",
     element: (
       <>
         <Navbar />
         <AboutUs />
       </>
     ),
   },

   {
     path: "/contactus",
     element: (
       <>
         <Navbar />
         <ContactUs />
       </>
     ),
   },

   {
     path: "/services",
     element: (
       <>
         <Navbar />
         <Services />
       </>
     ),
   },

   {
     path: "/accessories",
     element: (
       <>
         <Navbar />
         <Accessories />
       </>
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
        <RouterProvider  router ={router} />
     </div>
   )
 }
 
 export default App
 
