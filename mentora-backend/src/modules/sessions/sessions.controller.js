const sessionsService = require("./sessions.service");

const createSession = async (req,res) =>{
    try {

        const mentorId = req.user.id;

        const session = await sessionsService.createSession(mentorId,req.body);

        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const getLessionSessions = async (req,res) =>{
    try {
        const lessonId = req.params.id;

        const sessions = await sessionsService.getLessionSessions(lessonId);

        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    createSession,
    getLessionSessions
}