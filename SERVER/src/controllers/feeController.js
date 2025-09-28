const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const feeModel = require("../models/feeModel");
const { default: mongoose } = require("mongoose");


const createFee = asyncHandler(async (req, res) => {
    const feeDetails = req.body
    // console.log(req.body);
    // if (!feeType || !feeAmount || !month || !bankDetail) {
    //     throw new ApiError(400, "All fields are required")
    // }
    const checkFeeType = await feeModel.findOne({feeType : feeDetails.feeType})
    if (checkFeeType) {
        await feeModel.findByIdAndUpdate(checkFeeType._id, feeDetails, { new: true, runValidators: true })
        return res.status(200).json({ message: "Fee updated successfully" })
    }


    const newFeeGenrated = await feeModel.create(feeDetails)
    if (!newFeeGenrated) {
        throw new ApiError(401, "Somthing went wrong at Creating fee")
    }

    return res.status(200).json({ message: "Fee created successfully" })
})

const deleteFee = asyncHandler(async (req, res) => {
    try {
        const feeId = req.params.id;
        if (!mongoose.isValidObjectId(feeId)) {
            return res.status(400).send('Invalid ID format');
        }
        const user = await feeModel.findByIdAndDelete(feeId)
        if (!user) {
            return res.status(400).json({ message: "Fee Data Not Found" })
        }
        return res.status(200).json({ message: "Fee Deleted successfully" })

    } catch (error) {
        console.log("error ", error);
        return res.status(500).json({ message: "Somthing went wrong at Delete fee" })
    }
})


module.exports = {
    createFee,
    deleteFee,
}