const prisma = require("../../config/prisma");

const createLesson = async (mentorId, data) => {

  const lesson = await prisma.lesson.create({
    data: {
      title: data.title,
      description: data.description,
      mentorId: mentorId
    }
  });

  return lesson;
};

const getLessons = async () => {

  const lessons = await prisma.lesson.findMany({
    include: {
      mentor: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  return lessons;
};

module.exports = {
  createLesson,
  getLessons
};