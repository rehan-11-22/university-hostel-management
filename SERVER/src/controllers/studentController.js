const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const { uploadCloudinary } = require("../utils/Cloudinary");
const { HashPassword } = require("../utils/HashPassword");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/studentModel");
const { default: mongoose } = require("mongoose");
const { generateRandomPassword } = require("../constants");
const roomModel = require("../models/roomModel");
const complaintModel = require("../models/complaintModel");

//Mehtod use to genrate access and refresh token for user and save refresh token in  database
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const student = await studentModel.findById(userId);
    const accessToken = student.genrateAccessToken();
    const refreshToken = student.genrateRegreshToken();

    student.refreshToken = refreshToken;
    await student.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Somthing went wrong at genrating access and refresh token"
    );
  }
};

const registerStudent = asyncHandler(async (req, res) => {
  // get Student details from frontend
  // validation e.g=> check -not empty
  // check if Student already exists: username, email
  // check for image , check for avatar
  // upload them on cloudinary, avatar
  // create user object --create entry in DB
  // remove password and refresh token field from response
  // check for student creation
  // return response

  const {
    username,
    email,
    fullname,
    religion,
    homeAdress,
    phoneNumber,
    matrialStatus,
    nationality,
    state,
    city,
    gender,
    cnic,
    dob,
    dept,
    discipline,
    section,
    session,
    rollNumber,
    roomId,
    hostelName,
  } = req.body;
  // console.log("email", email);

  // Hashed password
  const hashPassword = await HashPassword(cnic);
  // console.log("Hash password in controller", hashPassword);

  if (
    !username ||
    !email ||
    !fullname ||
    !religion ||
    !homeAdress ||
    !phoneNumber ||
    !matrialStatus ||
    !nationality ||
    !state ||
    !city ||
    !gender ||
    !cnic ||
    !dob ||
    !dept ||
    !discipline ||
    !section ||
    !rollNumber ||
    !hostelName ||
    !session
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await studentModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    return res.status(400).json({ message: "email or usernaem already exists" })
  }
  const avatarLocalPath = await req.files?.avatar[0]?.path;
  const coverImageLocalPath = await req.files?.coverImage?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // find Room for student
  const room = await roomModel.findById(roomId);
  if (!room) {
    return res.status(401).json({ message: "There is no room id matched" });
  }

  const newStudent = await studentModel.create({
    fullname,
    religion,
    homeAdress,
    phoneNumber,
    matrialStatus,
    nationality,
    state,
    city,
    gender,
    cnic,
    dob,
    dept,
    discipline,
    section,
    session,
    rollNumber,
    hostelName,
    avatar: avatar.url,
    coverImage: coverImage?.url,
    email,
    password: hashPassword,
    username: username.toLowerCase(),
  });
  // console.log("New user data ==>", newStudent);

  const createdStudent = await studentModel
    .findById(newStudent._id)
    .select("-password -refreshToken");
  if (!createdStudent) {
    throw new ApiError(500, "somthing went wrong while register a user");
  }
  if (room) {
    const studentId = newStudent._id; // Example student ID
    room.students.push(studentId); // Convert to string and push to array
    console.log("This is my room data for :  ", room.students);
    await room.save();
  }

  return res
    .status(200)
    .json({ data: createdStudent, message: "Student Registered successfully" });
});

// Login User

const loginStudent = asyncHandler(async (req, res) => {
  // collect data from req.body
  // username and email
  // check user is exist
  // check password is correct
  // generate access and refresh token
  // send cookie
  const { username, email, password } = req.body;
  // here check username and email if one of them is exist then proced
  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  const studentData = await studentModel.findOne({
    $or: [{ username }, { email }],
  });
  if (!studentData) {
    return res.status(400).json({ message: "Student does not exist" });
  }

  const isPasswordValid = await studentData.ispasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Password is not matched" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    studentData._id
  );

  const logedInUser = await studentModel
    .findById(studentData._id)
    .select("-password -refreshToken");
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      data: { logedInUser, accessToken, refreshToken },
      message: "Student logedIn Successfully",
    });
});

//Update user password
const updateStudentPassword = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const hashpassword = await HashPassword(password);
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send("Invalid ID format");
    }
    console.log("id ==>", id, "hashpasswrod==>", hashpassword);
    const student = await studentModel.findByIdAndUpdate(
      id,
      { password: hashpassword },
      { new: true, runValidators: true }
    );

    if (!student) {
      throw new ApiError(400, "student not found");
    }
    return res
      .status(200)
      .json({ message: "student password updated successfully" });
  } catch (error) {
    console.log("error ", error);
    throw new ApiError(
      400,
      "Somthing went wrong at updating student password",
      error
    );
  }
});

// forgot user password
const forgotStudentPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email field required");
  }

  const student = await studentModel.findOne({ email });
  if (!student) {
    throw new ApiError(400, "User not found");
  }
  const { _id } = student;
  console.log("student id ", _id.toString());
  const randomPassword = generateRandomPassword();

  console.log("random password", randomPassword);
  const hashedPassword = await HashPassword(randomPassword);
  console.log("hashed password", hashedPassword);

  const updatedPass = await userModel.findByIdAndUpdate(
    _id.toString(),
    { password: hashedPassword },
    { new: true, runValidators: true }
  );

  console.log("student after updated password", updatedPass);
  // here write code for mail the student's password

  return res
    .status(200)
    .json({ message: "Your password is updated successfully" });
});

// Logout student

const logoutStudent = asyncHandler(async (req, res) => {
  await userModel.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: undefined },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "User logedout" });
});

// user complaint controller
const complaints = asyncHandler(async (req, res) => {
  try {
    const { email, description, complaintType } = req.body;
    console.log(email, description, complaintType);

    const newComplaint = await complaintModel.create({ email, description, complaintType });
    console.log("after create complaints", newComplaint);
    return res
      .status(200)
      .json({ message: "complaint registered successfully" });
  } catch (error) {
    console.log("Error at complaint ", error);
    return res.status(400).json({ message: "something went wrong", error });
  }
});

// Delete student data
const deleteStudentData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    console.log("student id ", id);

    const stdRecord = await studentModel.findByIdAndDelete({ _id: id })
    if (!stdRecord) {
      return res.status(400).json({ message: "Student Record can not found" })
    }
    const result = await roomModel.updateMany(
      { students: id },
      { $pull: { students: id } }
    );

    return res.status(200).json({ message: "Student Record deleted successfully" })
  } catch (error) {
    return res.status(500).json({ message: "Somthing went wrong" })
  }

})

// Delete student data
const updateComplaint = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const complaint = await complaintModel.findOne({ _id: id })
    if (!complaint) {
      return res.status(400).json({ message: "Complaint not deleted" })
    }
    // Check if the current status is "pending"
    if (complaint.status.includes('pending')) {
      // Remove "pending" and add "processing"
      complaint.status = complaint.status.filter(status => status !== 'pending');
      complaint.status.push('processing');

      // Save the updated complaint
      await complaint.save();

      return res.status(200).json({ message: 'Complaint status updated to processing', complaint });
    } else if (complaint.status.includes('processing')) {
      complaint.status = complaint.status.filter(status => status !== 'processing');
      complaint.status.push('success');

      // Save the updated complaint
      await complaint.save();

      return res.status(200).json({ message: 'Complaint status updated to processing', complaint });
    } else {
      return res.status(400).json({ message: "Complaint not in Processing || pending stage" })
    }


  } catch (error) {
    return res.status(500).json({ message: "Somthing went wrong" })
  }

})

// update student profile
const updateStudentData = asyncHandler(async (req, res) => {
  try {
    const { _id, username, fullname, email, role } = req.body.values;
    const { stdRoom, selectedHostel } = req.body;

    if (!mongoose.isValidObjectId(_id)) {
      return res.status(400).send('Invalid ID format');
    }

    const updatedData = { username, fullname, email, role, hostelName: selectedHostel };

    // Find the student by ID and update their profile
    const user = await studentModel.findByIdAndUpdate(_id, updatedData, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If stdRoom is provided, handle room assignment
    if (stdRoom) {
      if (!mongoose.isValidObjectId(stdRoom)) {
        return res.status(400).send('Invalid Room ID format');
      }

      // Find the room to assign the student to
      const newRoom = await roomModel.findById(stdRoom);
      if (!newRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }

      // Check if the room is available
      if (newRoom.students.length >= newRoom.capacity) {
        return res.status(400).json({ message: 'Room is full' });
      }

      // Find the student's current room
      const previousRoom = await roomModel.findOne({ students: _id });

      if (previousRoom) {
        // Remove the student from the previous room
        previousRoom.students = previousRoom.students.filter(student => student.toString() !== _id);
        previousRoom.isAvailable = previousRoom.students.length < previousRoom.capacity;
        await previousRoom.save();
      }

      // Add the student to the new room
      newRoom.students.push(_id);
      newRoom.isAvailable = newRoom.students.length < newRoom.capacity;
      await newRoom.save();
    }

    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating student data:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }





  // try {
  //   // const { id } = req.params
  //   const { _id, username, fullname, email, role } = req.body.values
  //   const { stdRoom } = req.body
  //   const updatedData = {
  //     username, fullname, email, role
  //   }

  //   console.log("std id ", _id);
  //   if (!mongoose.isValidObjectId(_id)) {
  //     return res.status(400).send('Invalid ID format');
  //   }
  //   console.log("id ==>", _id, "updatedData==>", updatedData)
  //   // find room data
  //   const room = await roomModel.findById(stdRoom)
  //   // if not change room data
  //   if (!stdRoom) {
  //     const user = await studentModel.findByIdAndUpdate(_id, updatedData, { new: true, runValidators: true })
  //     if (!user) {
  //       return res.status(400).json({ message: "User not found" })
  //     }
  //     return res.status(200).json({ message: "User profile updated successfully" })
  //   } else {
  //     // Previous student Room finding
  //     const previousStdRoom = await roomModel.findOne({ students: _id });
  //     if (!previousStdRoom) {
  //       const user = await studentModel.findByIdAndUpdate(_id, updatedData, { new: true, runValidators: true })
  //       if (!user) {
  //         return res.status(400).json({ message: "User not found" })
  //       }
  //       room.students.push(_id); // Convert to string and push to array
  //       // console.log("This is my room data for :  ", room.students);
  //       await room.save();

  //       return res.status(200).json({ message: "User profile updated successfully" })
  //     } else {
  //       const user = await studentModel.findByIdAndUpdate(_id, updatedData, { new: true, runValidators: true })
  //       if (!user) {
  //         return res.status(400).json({ message: "User not found" })
  //       }
  //       room.students = room.students.filter(student => student.toString() !== _id);
  //       // Update the room's availability based on the number of students
  //       room.isAvailable = room.students.length < room.capacity;

  //       room.students.push(_id);

  //       // Save the updated room document
  //       await room.save();
  //     }

  //   }


  // } catch (error) {
  //   console.log("error ", error);
  //   return res.status(500).json({ message: "Somthing went wrong" })

  // }
})


// User refresh access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unauthorize request");
  }
  const decodedToken = jwt.verify(
    incomingRefreshToken.trim(),
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = userModel.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }

  if (incomingRefreshToken.trim() !== user?.refreshToken) {
    throw new ApiError(400, "Refresh token is expired or used");
  }
});



module.exports = {
  registerStudent,
  loginStudent,
  updateStudentPassword,
  logoutStudent,
  forgotStudentPassword,
  refreshAccessToken,
  complaints,
  updateStudentData,
  updateComplaint,
  deleteStudentData
};