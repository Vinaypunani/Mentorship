const { z } = require("zod");

const createSessionSchema = z.object({
    lessonId: z.string().uuid(),
    date: z.string().datetime(),
    topic: z.string().min(3, "Topic must be at least 3 characters long"),
    summary: z.string().min(10, "Summary must be at least 10 characters long")
})

module.exports = { createSessionSchema }