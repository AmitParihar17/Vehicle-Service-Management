

const Joi = require("joi");

// Registration Validation
const registrationValidation = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username cannot be longer than 30 characters.",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "any.required": "Confirm password is required.",
  }),

  role: Joi.string()
    .trim()
    .valid("user", "admin")
    .required()
    .messages({
      "any.only": "Role must be either user, or admin.",
      "any.required": "Role is required.",
    })
    .custom((value, helper) => {
      return value.toLowerCase(); // Converts the input to lowercase before validation
    }),
});




// Login Validation
const loginValidation = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
}).unknown(true);

// Validation schema for adding a user
const addUserValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').required(),
});

const ProductValidation = Joi.object({
  productName: Joi.string().min(5).required(),
  productDescription: Joi.string().min(20).required(),
  inStock: Joi.boolean().truthy("true").falsy("false").required(),
  category: Joi.string().required(),
  productPrice: Joi.number().required(),
  offerPrice: Joi.number().required(),
});

module.exports = {
  registrationValidation,
  loginValidation,
  addUserValidation,
  ProductValidation,
};

