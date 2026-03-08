const express = require("express");
const router = express.Router();

const controller = require("./lessons.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/role.middleware");
const validate = require("../../middleware/validate.middleware");

const {
    createLessonSchema
} = require("./lessons.validation");

router.post(
    "/",
    authMiddleware,
    authorizeRoles("mentor"),
    validate(createLessonSchema),
    controller.createLesson
);

router.get(
    "/",
    authMiddleware,
    controller.getLessons
);

module.exports = router;