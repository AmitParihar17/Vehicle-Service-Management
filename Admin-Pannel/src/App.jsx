 import React from "react";
 import AdminDashboard from "./Pages/AdminDashboard";
 import { Routes, Route, Navigate } from "react-router-dom";
 import NotFound from "./Components/NotFound";
 import Users from "./Pages/User";
 import Login from "./Pages/Login";
import Services from "./Pages/Services";
import UploadFile from "./Pages/uploadFile";
import Uploadproduct from "./Pages/Uploadproduct";
import Products from "./Pages/Products";
import ManageOrders from "./Pages/ManageOrders";
import UploadService from "./Pages/UploadService";
 const App = () => {
   return (
     <div>
       <Routes>
         <Route path="/" element={<Navigate to="/login" />} />
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<AdminDashboard />}></Route>
         <Route path="/dashboard/users" element={<Users />} />
         <Route path="/dashboard/services" element={<Services />} />
         <Route path="/dashboard/upload" element={<Uploadproduct />} />
         <Route path="/dashboard/products" element={<Products/>}/>
         <Route path="/dashboard/manage-orders" element={<ManageOrders/>}/>
         <Route path="/dashboard/upload-service" element={<UploadService/>}/>
         <Route path="/uploads" element={<UploadFile />} />
         <Route path="*" element={<NotFound />}></Route>
       </Routes>
     </div>
   );
 };

 export default App;