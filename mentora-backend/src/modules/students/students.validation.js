const { z } = require("zod");

const createStudentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  age: z
    .number()
    .int()
    .min(4)
    .max(25)
});

module.exports = {
  createStudentSchema
};