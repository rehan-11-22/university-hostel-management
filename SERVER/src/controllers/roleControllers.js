const asyncHandler = require("express-async-handler");
const roleModel = require("../models/roleModel");
const ApiError = require("../utils/ApiError");


const roleController = asyncHandler(async (req, res) => {
    try {
        const { roleType, permission } = req.body
        if (!roleType || !permission) {
            throw new ApiError(401, "Roletype and Permission required")
        }
        const existedRole = await roleModel.findOne({ roleType })
        if (existedRole) {
            throw new ApiError(400, "Role already exist")
        }
        const newRole = await roleModel.create({
            roleType,
            permission,
        })
        console.log("new role ==>", newRole);


        return res.status(200).json({ message: "Role has been added successfully" })
    } catch (error) {
        throw new ApiError(500, "somthing went wrong", error)
    }
})

module.exports = {
    roleController,
}