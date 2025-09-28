const express = require('express')
const mongoose = require('mongoose');
const { createAttendance, getMessAttendance, getWeeklyAttendance } = require('../controllers/attendanceController')
const attendanceModel = require('../models/attendanceModel')
const router = express.Router()

// For GET Request
router.get('/:id/:hostelName', getMessAttendance)
// For GET Request
router.get('/:hostelName', getWeeklyAttendance)

// submit attendance
router.post("/create", createAttendance)




module.exports = router