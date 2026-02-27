const { body } = require("express-validator");

exports.validateStudent = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email"),

  body("rollNumber")
    .trim()
    .notEmpty().withMessage("Roll number is required"),

  body("course")
    .trim()
    .notEmpty().withMessage("Course is required"),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone number is required")
    .matches(/^\d{10}$/).withMessage("Phone must be exactly 10 digits"),

  body("address")
    .trim()
    .notEmpty().withMessage("Address is required"),

  body("city")
    .trim()
    .notEmpty().withMessage("City is required"),

  body("state")
    .trim()
    .notEmpty().withMessage("State is required"),

  body("marks")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0, max: 100 }).withMessage("Marks must be between 0 and 100"),
];
