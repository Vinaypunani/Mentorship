const studentService = require("./students.service");

const createStudent = async (req,res) =>{
    try {
        const parentId = req.user.id;
        const student = await studentService.createStudent(parentId, req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getStudent = async (req,res) =>{
    try {
        const parentId = req.user.id;
        const student = await studentService.getStudent(parentId);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createStudent,
    getStudent
}