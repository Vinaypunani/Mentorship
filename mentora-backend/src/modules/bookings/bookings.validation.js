const { z } = require("zod");

const createBookingSchema = z.object({
    studentId: z.string().uuid(),
    lessonId: z.string().uuid(),
});

module.exports = {
    createBookingSchema
}