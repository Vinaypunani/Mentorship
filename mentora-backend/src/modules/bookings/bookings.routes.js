const express = require("express");
const router = express.Router();

const controller = require("./bookings.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware")
const validate = require("../../middleware/validate.middleware");

const { createBookingSchema } = require("./bookings.validation")

router.post("/", authMiddleware, authorizeRoles("parent"), validate(createBookingSchema), controller.createBooking);


module.exports = router