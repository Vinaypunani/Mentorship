const express = require("express");
const router = express.Router();

const controller = require("./llm.controller")

const validate = require("../../middleware/validate.middleware")
const { llmRateLimit } = require("../../middleware/rateLimit.middleware");

const { summarizeSchema } = require("./llm.validation")

router.post("/summarize", llmRateLimit, validate(summarizeSchema), controller.summarizeText)

module.exports = router;