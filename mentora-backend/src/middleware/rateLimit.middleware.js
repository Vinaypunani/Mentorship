const rateLimit = require("express-rate-limit");

const llmRateLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        error: "Too many requests. Try again later."
    }
})

module.exports = { llmRateLimit}