const express = require('express')
const { createFee, deleteFee } = require('../controllers/feeController')
const feeModel = require('../models/feeModel')
const studentModel = require('../models/studentModel')
const router = express.Router()


// for get request
router.get('/', async (req, res) => {
    const feeData = await feeModel.find({})

    res.status(200).json({ feeData, message: "welcome to Fee route" })
})
// for get request
router.get('/:feeType/:stdRegNumber', async (req, res) => {
    try {
        // console.log(req.params);
        const { feeType, stdRegNumber } = req.params;
        const feeData = await feeModel.findOne({ feeType: feeType })
        if (!feeData) {
            return res.status(400).json({ message: "Fee data Not found" })
        }
        const studentData = await studentModel.findOne({ cnic: stdRegNumber })
        if (!studentData) {
            return res.status(400).json({ message: "Student Not found" })
        }
        return res.status(200).json({ feeData, studentData, message: "Fee data and student Data" })
    } catch (error) {
        console.log("error at getting feedata ", error);
        return res.status(400).json({ message: "Somthing went wrong getting data" })
    }
})

// adding fee data
router.post("/create", createFee)
// delete fee data
router.delete("/delete/:id", deleteFee)


module.exports = router