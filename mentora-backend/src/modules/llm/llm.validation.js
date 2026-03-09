const { z } = require("zod");

const summarizeSchema = z.object({
    text: z
        .string()
        .min(50, "Text must be at least 50 characters long")
        .max(10000, "Text too large")
});

module.exports = { summarizeSchema }