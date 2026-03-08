const prisma = require("../../config/prisma");

const createStudent = async (parentId, data) => {
    const student = await prisma.student.create({
        data:{
            name:data.name,
            age:data.age,
            parentId: parentId
        }
    });

    return student;
}

const getStudent = async (parentId) =>{
    const students = await prisma.student.findMany({
        where: {
            parentId: parentId
        }
    });

    return students;
}

module.exports = {
    createStudent,
    getStudent
}