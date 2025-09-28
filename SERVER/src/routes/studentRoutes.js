const express = require('express')
const router = express.Router()
const { upload } = require("../middlewares/multerMiddleware")
const { verifyJWT } = require('../middlewares/authMiddleware')
const { roleController } = require('../controllers/roleControllers')
const { registerStudent, loginStudent, updateStudentPassword, complaints, deleteStudentData, updateStudentData, updateComplaint } = require('../controllers/studentController')
const studentModel = require('../models/studentModel')
const Complaints = require('../models/complaintModel')
const complaintModel = require('../models/complaintModel')


// for get request
router.get('/', async (req, res) => {
    try {

        const allStdData = await studentModel.find({})

        res.status(200).json({ allStdData, message: "Student list" })
    } catch (error) {
        return res.status(500, "Somthing went wrong to get student data")
    }
})
// // for get request
// router.get('/:hostelName', async (req, res) => {
//     try {
//         const { hostelName } = req.params
//         const allStdData = await studentModel.find({ hostelName: hostelName })

//         res.status(200).json({ allStdData, message: "Student list" })
//     } catch (error) {
//         return res.status(500, "Somthing went wrong to get student data")
//     }
// })
router.get('/complaint', async (req, res) => {
    try {
        const allComplaintData = await Complaints.find({}).sort("status")

        res.status(200).json({ allComplaintData, message: "Complaint List" })
    } catch (error) {
        return res.status(500, "Somthing went wrong to get complaint data")
    }
})
router.get('/hostelName/:hostelName', async (req, res) => {
    try {
        const { hostelName } = req.params;
        const allStdData = await studentModel.find({ hostelName: hostelName })

        res.status(200).json({ allStdData, message: "Student list" })
    } catch (error) {
        return res.status(500, "Somthing went wrong to get student data")
    }
})

// for Register Student
router.post('/register', upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), registerStudent)

// for login student

router.post('/login', loginStudent)

// for update student Password

router.post('/update/password/:id', updateStudentPassword)

// logOut user
// router.post('/logout', verifyJWT, logoutUser)
// complaints
router.post('/complaint', complaints)
// deleting complaint
router.delete('/complaint/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteComplaint = await complaintModel.findByIdAndDelete({ _id: id })
        if (!deleteComplaint) {
            return res.status(400).json({ message: "Complaint not deleted" })
        }
        return res.status(200).json({ message: "Complaint deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Somthing went wrong" })
    }
})
// proceed complaint
router.put('/complaint/:id', updateComplaint)
// Update profile of student
router.post('/update', updateStudentData)
// delete Student
router.delete('/delete/:id', deleteStudentData)


module.exports = router