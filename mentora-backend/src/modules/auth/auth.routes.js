const express = require("express");
const router = express.Router();

const controller = require('../auth/auth.controller');
const authMiddleware = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const { signupSchema, loginSchema } = require("../auth/auth.validation");

router.post("/signup", validate(signupSchema), controller.signup);
router.post("/login", validate(loginSchema), controller.login);
router.get("/me", authMiddleware,controller.me);

module.exports = router;