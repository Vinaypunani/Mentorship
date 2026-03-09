const model = require("../../config/gemini");

const summarizeText = async (text) => {

    const systemInstruction = `
You are a professional summarization assistant used in a backend API.

STRICT OUTPUT RULES:
- Return ONLY bullet points
- Do NOT include titles or introductions
- Do NOT write phrases like "Here is a summary"
- Output must start immediately with "- "
- Produce 3–6 bullet points
- Maximum 120 words total
`;

    const prompt = `${systemInstruction}\n\nText:\n${text}`;


    try {
        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                temperature: 0.3
            }
        });

        const response = await result.response;

        if (!response) {
            const error = new Error("Invalid response from LLM");
            error.statusCode = 502;
            throw error;
        }

        let summary = response?.text();

        if (!summary) {
            const error = new Error("Empty summary returned from LLM");
            error.statusCode = 502;
            throw error;
        }

        summary = summary.trim();

        return {
            summary,
            model: process.env.GEMINI_MODEL
        };
    } catch (error) {
        console.error("LLM Error:", error);

        const err = new Error("Failed to generate summary from LLM");
        err.statusCode = error.statusCode || 502;
        throw err;
    }

};

module.exports = { summarizeText }