const express = require("express");
const router = express.Router();

const studentController = require("./students.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");
const validate = require("../../middleware/validate.middleware");
const { createStudentSchema } = require("./students.validation");

router.post("/", authMiddleware, authorizeRoles("parent"), validate(createStudentSchema), studentController.createStudent);
router.get("/", authMiddleware, authorizeRoles("parent"), studentController.getStudent);

module.exports = router;