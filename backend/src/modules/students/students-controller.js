const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const payload = req.query;
    const students = await getAllStudents(payload);
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const { id: reporterId } = req.user;
    const payload = { ...req.body, reporterId, operationType: "add" };
    const result = await addNewStudent(payload);
    res.json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { id: reporterId } = req.user;
    const payload = { ...req.body, id, reporterId, operationType: "update" };
    const result = await updateStudent(payload);
    res.json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const { status } = req.body;
    const result = await setStudentStatus({ userId, reviewerId, status });
    res.json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
