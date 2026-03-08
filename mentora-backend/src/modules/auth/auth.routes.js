const express = require("express");
const router = express.Router();

const controller = require('../auth/auth.controller');
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/me", authMiddleware,controller.me);

module.exports = router;