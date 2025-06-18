const router=require("express").Router();
const register=require("../../controller/auth/register")
const login = require('../../controller/auth/login')
const {checkAuth} = require("../../middlewares/checkAuth.js")
const getAllUsers = require("../../controller/auth/Getuser.js");
const addUser = require("../../controller/auth/addUser.js");
const updateUser= require("../../controller/auth/updateUser");
const deleteUser = require('../../controller/auth/deleteUser');
const google = require("../../controller/auth/google.js");
const { products } = require("../../controller/auth/Product.js");
const {GetProducts} = require("../../controller/auth/AllProducts.js")
const { DeleteProduct } = require("../../controller/auth/DeleteProduct");
const { EditProduct } = require("../../controller/auth/EditProduct");



router.delete("/deleteproduct", DeleteProduct);
router.put("/editproduct", EditProduct);
router.post("/register",register);
router.post("/login",login);
router.get("/users",checkAuth,getAllUsers);
router.post("/addUser",checkAuth,addUser);
router.delete("/deleteUser/:id",checkAuth,deleteUser);
router.put("/updateUser/:id",checkAuth,updateUser);
router.post("/google",google)
router.post("/uploadfile", products);
router.get("/allproducts", GetProducts);

module.exports=router