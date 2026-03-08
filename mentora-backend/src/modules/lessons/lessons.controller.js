const lessonsService = require("./lessons.service");

const createLesson = async (req, res) => {

  try {

    const mentorId = req.user.id;

    const lesson = await lessonsService.createLesson(
      mentorId,
      req.body
    );

    res.status(201).json(lesson);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

const getLessons = async (req, res) => {

  try {

    const lessons = await lessonsService.getLessons();

    res.json(lessons);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

module.exports = {
  createLesson,
  getLessons
};