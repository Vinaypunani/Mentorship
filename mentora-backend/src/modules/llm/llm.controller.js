const llmService = require("./llm.service")

const summarizeText = async (req, res) => {
    try {
        const { text } = req.body;
        const result = await llmService.summarizeText(text);
        res.json({ result })
    } catch (error) {
        console.log("LLM Error: ",error);
        res.status(502).json({
            error: "LLM service failed",
            message: error.message
        })
    }
}

module.exports = { summarizeText }