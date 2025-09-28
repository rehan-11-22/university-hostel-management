const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModels")

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
        // console.log("Token in try block", token.trim());
        if (!token) {
            throw new ApiError(400, "UnAuthorize request")
        }
        // console.log("after token check");
        const decodedToken = await jwt.verify(token.trim(), process.env.ACCESS_TOKEN_SECRET)
        // console.log("decodedToken ==>", decodedToken);
        const user = await userModel.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(400, "Invalid access token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(400, "Invalid access token", error)
    }
})

module.exports = {
    verifyJWT
}