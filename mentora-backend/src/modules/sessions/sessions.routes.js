const express = require("express");

const router = express.Router();

const controller = require('./sessions.controller');

const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");
const validate = require("../../middleware/validate.middleware");

const { createSessionSchema } = require("./sessions.validation")

router.post("/", authMiddleware, authorizeRoles("mentor"), validate(createSessionSchema), controller.createSession);
router.get("/", authMiddleware, validate(createSessionSchema), controller.getLessionSessions);

module.exports = router;