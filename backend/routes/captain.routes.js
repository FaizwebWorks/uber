const captainController = require("../controllers/captain.controller");
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must at least 3 characters"),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body("vehicle.color").isLength({min: 3}).withMessage("Color must be at least 3 characters"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate number must be at least 3 Numbers"),
    body("vehicle.capacity").isLength({ min: 1 }).withMessage("Vehicle capactity must be at least 1"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Invalid Vehicle Type"),
  ],
  captainController.registerCaptain
);

module.exports = router;
