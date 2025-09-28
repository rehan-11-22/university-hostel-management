const expressAsyncHandler = require("express-async-handler");
const studentModel = require("../models/studentModel");
const studentFeeModel = require("../models/studentFeeModel");


const createFeeHistory = expressAsyncHandler(async (req, res) => {
    try {
        const studentFeeData = req.body
        // console.log("student fee data ", studentFeeData);
        const findStudent = await studentModel.findOne({ _id: studentFeeData.stdId })
        // console.log("student ", findStudent);

        const newStudentFeeRecord = {
            hostelName: findStudent?.hostelName,
            studentName: findStudent?.fullname,
            studentcnic: findStudent?.cnic,
            feeType: studentFeeData?.feeType,
            totalAmount: studentFeeData?.totalAmount,
            createdBy: studentFeeData?.createdBy,
        }
        // console.log("new record to submit ", newStudentFeeRecord);

        const newRecord = await studentFeeModel.create(newStudentFeeRecord)
        if (!newRecord) {
            res.status(201).json({ message: "Somthing went wrong to create fee record" })
        }

        res.status(200).json({ message: "Fee Record also submit" })


    } catch (error) {
        res.status(500).json({ message: "Somthing went wrong" })
    }


})

const updateFeeRecord = expressAsyncHandler(async (req, res) => {
    const { feeId } = req.params

    const { _id, email } = req.body
    // console.log("user data ", email);
    const updatedBy = {
        userId: _id,
        userEmail: email
    }
    const findStdFee = await studentFeeModel.findByIdAndUpdate({ _id: feeId }, { feeStatus: "paid",updatedBy }, { new: true, runValidators: true })
    if (!findStdFee) {
        res.status(404).json({ message: "Record not found Some issue" })
    } else {

        res.status(200).json({ message: "Status updated successfully" })
    }
})

module.exports = {
    createFeeHistory,
    updateFeeRecord
}