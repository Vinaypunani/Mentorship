const prisma = require("../../config/prisma");

const createBooking = async (parentId, data) => {
    const student = await prisma.student.findUnique({
        where: { id: data.studentId }
    });

    if (!student) {
        throw new Error("Student not found");
    }

    if (student.parentId !== parentId) {
        throw new Error("Student dose not belong to this parent");
    }

    const lesson = await prisma.lesson.findUnique({
        where: { id: data.lessonId }
    });

    if (!lesson) {
        throw new Error("Lesson not found");
    }

    const existingBooking = await prisma.booking.findFirst({
        where: {
            lessonId: data.lessonId,
            studentId: data.studentId
        }
    });

    if (existingBooking) {
        throw new Error("Student already booked for this lesson");
    }

    const booking = await prisma.booking.create({
        data: {
            lessonId: data.lessonId,
            studentId: data.studentId
        }
    });

    return booking;
}

module.exports = { createBooking }