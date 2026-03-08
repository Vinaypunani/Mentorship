const prisma = require("../../config/prisma")

const createSession = async (mentorId,data) =>{
    const lesson = await prisma.lesson.findUnique({
        where:{ 
            id: data.lessonId
        }
    });

    if(!lesson){
        throw new Error("Lesson not found")
    }

    if(lesson.mentorId !== mentorId){
        throw new Error("You can only create sessions for your own lessons");
    }

    const session = await prisma.session.create({
        data:{
            lessonId: data.lessonId,
            date: data.date,
            topic: data.topic,
            summary: data.summary
        }
    });

    return session;
}

const getLessionSessions = async (lessonId) =>{
    const sessions = await prisma.session.findMany({
        where:{
            lessonId: lessonId
        },
        orderBy:{
            date: "asc"
        }
    });

    return sessions;
}

module.exports = {
    createSession,
    getLessionSessions
}