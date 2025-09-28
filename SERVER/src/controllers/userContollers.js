
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const userModel = require("../models/userModels")
const { uploadCloudinary } = require("../utils/Cloudinary");
const { HashPassword } = require("../utils/HashPassword");
const jwt = require("jsonwebtoken")
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const { generateRandomPassword } = require("../constants");
const employeeLoginHistoryModel = require("../models/employeeLoginHistoryModel");
const studentModel = require("../models/studentModel");

//Mehtod use to genrate access and refresh token for user and save refresh token in  database
const generateAccessAndRefreshToken = async (userId) => {

    try {
        const user = await userModel.findById(userId)
        const accessToken = user.genrateAccessToken()
        const refreshToken = user.genrateRegreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Somthing went wron at genrating access and refresh token")
    }

}

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation e.g=> check -not empty
    // check if user already exists: username, email
    // check for image , check for avatar
    // upload them on cloudinary, avatar
    // create user object --create entry in DB
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { username, email, fullname, password, role } = req.body
    console.log("email", email);

    // Hashed password 
    const hashPassword = await HashPassword(password)
    // console.log("Hash password in controller", hashPassword);

    if (!username.trim() || !email.trim() || !fullname.trim() || !password.trim() || !role.trim()) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const existedUser = await userModel.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        return res.status(409).json({ message: "User email or username already exists" })
    }

    const avatarLocalPath = await req.files?.avatar[0]?.path
    // const coverImageLocalPath = await req.files?.coverImage[0]?.path || ""
    console.log("Avatar local path ==>", avatarLocalPath);

    if (!avatarLocalPath) {
        // throw new ApiError(400, "Avatar file is required")
        return res.status(400).json({ message: "Avatar file is required" })
    }

    const avatarCloudinar = await uploadCloudinary(avatarLocalPath)
    // const coverImageCloudinary = await uploadCloudinary(coverImageLocalPath)
    if (!avatarCloudinar) {
        throw new ApiError(400, "Avatar file is required")
    }

    // return console.log("cover image path after upload on cloudinary ==>", coverImage.url);
    const newUser = await userModel.create({
        fullname,
        role,
    
        avatar: avatarCloudinar.url,
        // profileImage: coverImageCloudinary?.url || "",
        email,
        password: hashPassword,
        username: username.toLowerCase()
    })
    console.log("New user data ==>", newUser);


    const createdUser = await userModel.findById(newUser._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "somthing went wrong while register a user")
    }

    // Unlink files from local storage
    fs.unlinkSync(avatarLocalPath)
    // fs.unlinkSync(coverImageLocalPath)


    return res.status(200).json({ data: createdUser, message: "User Registered successfully" })
})

// Login User

const loginUser = asyncHandler(async (req, res) => {
    // collect data from req.body
    // username and email
    // check user is exist
    // check password is correct
    // generate access and refresh token
    // send cookie
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }

    // const userData = await userModel.findOne({
    //     $or: [{ username }, { email }]
    // })

    const userData = await userModel.findOne({ email })

    if (!userData) {
        return res.status(400).json({ message: "User does not exist" })
    }

    const isPasswordValid = await userData.ispasswordCorrect(password)

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Password is not matched" })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(userData._id)

    const logedInUser = await userModel.findById(userData._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }

    // Login history 
    await EmployeeLoginHistory(logedInUser)

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ data: { logedInUser, accessToken, refreshToken }, message: "User logedIn Successfully" })

})

//Update user data
const updateUserData = asyncHandler(async (req, res) => {
    try {
        // const { id } = req.params
        const { _id, username, fullname, email, role } = req.body
        const updatedData = {
            username, fullname, email, role
        }
        console.log(_id);
        if (!mongoose.isValidObjectId(_id)) {
            return res.status(400).send('Invalid ID format');
        }
        console.log("id ==>", _id, "updatedData==>", updatedData)
        const user = await userModel.findByIdAndUpdate(_id, updatedData, { new: true, runValidators: true })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        return res.status(200).json({ message: "User profile updated successfully" })

    } catch (error) {
        console.log("error ", error);
        throw new ApiError(400, "Somthing went wrong at updating User Profile", error)
    }
})

// forgot user password
const forgotUserPassword = asyncHandler(async (req, res) => {
    try {
        const { email, cnic } = req.body.values
        if (!email || !cnic) {
            throw new ApiError(400, "Email field required")
        }

        const user = await userModel.findOne({ email, cnic })
        const student = await studentModel.findOne({ email,cnic })
        if (!user && !student) {
            return res.status(400).json({ message: "Please endter valid information" })
        }
        if (user) {

            const { _id } = user
            console.log("user id ", _id.toString());
            const randomPassword = generateRandomPassword()

            console.log("random password", randomPassword);
            const hashedPassword = await HashPassword(randomPassword)
            console.log("hashed password", hashedPassword);

            const updatedPass = await userModel.findByIdAndUpdate(_id.toString(), { password: hashedPassword }, { new: true, runValidators: true })

            console.log("user after updated password", updatedPass);
            // here write code for mail the user's password   
            return res.status(200).json({ message: "Your password is updated successfully" })
        }
        if (student) {
            const { _id } = student
            console.log("user id ", _id.toString());
            const randomPassword = generateRandomPassword()

            console.log("random password", randomPassword);
            const hashedPassword = await HashPassword(randomPassword)
            console.log("hashed password", hashedPassword);

            const updatedPass = await studentModel.findByIdAndUpdate(_id.toString(), { password: hashedPassword }, { new: true, runValidators: true })

            console.log("user after updated password", updatedPass);
            // here write code for mail the user's password   
            return res.status(200).json({ message: "Your password is updated successfully" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Server not respond || somthing went wrong" })

    }

})

//Update user password
const updateUserPassword = asyncHandler(async (req, res) => {
    try {
        // const { id } = req.params
        const { email, oldPassword, newPassword } = req.body
        // console.log("email ", email, "  password ", oldPassword);
        const oldHashPassword = await HashPassword(oldPassword)
        const newHashPassword = await HashPassword(newPassword)
        // if (!mongoose.isValidObjectId(id)) {
        //     return res.status(400).send('Invalid ID format');
        // }
        // console.log("hashpasswrod==>", oldHashPassword)
        const findUserAsEmployee = await userModel.find({ email: email, password: oldHashPassword })
        const findUserAsStudent = await studentModel.find({ email: email, password: oldHashPassword })

        // console.log("find user ", findUser);
        if (!findUserAsEmployee && !findUserAsEmployee) {
            return res.status(400).json({ message: "please enter valid information email || OldPassword" })
        }
        if (findUserAsEmployee) {

            await userModel.findByIdAndUpdate(findUserAsEmployee._id, { password: newHashPassword }, { new: true, runValidators: true })
        }
        if (findUserAsStudent) {

            await studentModel.findByIdAndUpdate(findUserAsStudent._id, { password: newHashPassword }, { new: true, runValidators: true })
        }

        // if (!user) {
        //     throw new ApiError(400, "User not found")
        // }
        return res.status(200).json({ message: "your password updated successfully" })

    } catch (error) {
        console.log("error ", error);
        throw new ApiError(400, "Somthing went wrong at updating User password", error)
    }
})
// Delete User
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const empId = req.params.id;
        if (!mongoose.isValidObjectId(empId)) {
            return res.status(400).send('Invalid ID format');
        }
        const user = await userModel.findByIdAndUpdate(empId, { isDeleted: true }, { new: true })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        return res.status(200).json({ message: "User profile Deleted successfully" })

    } catch (error) {
        console.log("error ", error);
        return res.status(500).json({ message: "Somthing went wrong at Delete user" })
    }
})


// Logout user

const logoutUser = asyncHandler(async (req, res) => {
    await userModel.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json({ message: "User logedout" })
})

// User refresh access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(400, "Unauthorize request")
    }
    const decodedToken = jwt.verify(incomingRefreshToken.trim(), process.env.REFRESH_TOKEN_SECRET)
    const user = userModel.findById(decodedToken?._id)
    if (!user) {
        throw new ApiError(401, "Invalid Refresh Token")
    }

    if (incomingRefreshToken.trim() !== user?.refreshToken) {
        throw new ApiError(400, "Refresh token is expired or used")

    }
})

//Employee login history maintain
const EmployeeLoginHistory = asyncHandler(async (logedInUser) => {
    const { _id } = logedInUser
    // console.log("employee for history", loginUser);
    await employeeLoginHistoryModel.create({
        employeeId: _id,
        loginTime: new Date(),
        loginStatus: 'success',
    });

    // console.log("history maintained");
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateUserData,
    deleteUser,
    forgotUserPassword,
    updateUserPassword
}