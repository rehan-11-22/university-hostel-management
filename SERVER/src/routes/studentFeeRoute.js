const express = require('express')
const { createFeeHistory, updateFeeRecord } = require('../controllers/studentFeeController')
const studentFeeModel = require('../models/studentFeeModel')
const router = express.Router()

router.get('/:hostelName', async (req, res) => {

    const { hostelName } = req.params
    // console.log("hostelName ", hostelName);
    const feeData = await studentFeeModel.find({ hostelName: hostelName.trim() })
    console.log("data ", feeData);
    if (feeData.length === 0) {
        res.status(201).json({ message: "There is no record found against That hostel" })

    } else {

        res.status(200).json({ message: "welcome  to student route for fee",feeData : feeData })
    }

})

router.post("/createfeerecord", createFeeHistory)
router.put("/updaterecord/:feeId", updateFeeRecord)

module.exports = router