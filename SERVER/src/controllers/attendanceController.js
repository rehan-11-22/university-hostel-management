const asyncHandler = require("express-async-handler");
const attendanceModel = require("../models/attendanceModel");
const messVoucherModel = require("../models/messVoucherModel");
const { default: mongoose } = require("mongoose");
const hostelModel = require("../models/hostelModel");


// const createAttendance = asyncHandler(async (req, res) => {
//     try {
//         const { messTime,hostelName, attendanceData } = req.body;



//         // Transform attendanceData to match the schema of Attendance model
//         // const transformedAttendanceData = attendanceData.map(({ studentId, status }) => ({
//         //     studentId,
//         //     status: status.toLowerCase() // Ensure status is lowercase to match enum values
//         // }));

//         // // Create a new document in Attendance collection
//         // await attendanceModel.create({
//         //     hostelName,
//         //     attendanceRecords: transformedAttendanceData
//         // });

//         // Check if hostel exists
//         let hostel = await attendanceModel.findOne({ hostelName });

//         // If hostel doesn't exist, create it
//         if (!hostel) {
//             hostel = await attendanceModel.create({ hostelName });
//         }

//         // Add attendance records to the hostel
//         hostel.attendanceRecords.push({ date: new Date(), messTime,records: attendanceData });
//         await hostel.save();



//         res.status(201).json({ message: 'Attendance submitted successfully' });
//     } catch (error) {
//         console.error('Error submitting attendance:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// })

const getMessAttendance = async (req, res) => {
  const { id, hostelName } = req.params;
  const currentGenDate = new Date();

  // console.log("ID ",id);
  // console.log("hostelName ",hostelName);

  try {
    // Find the last voucher generation date for the student
    const lastVoucher = await messVoucherModel.findOne({ studentId: id, hostelName });
    const lastgenDate = lastVoucher ? lastVoucher.lastgenDate : new Date(0); // Default to epoch if no record found

    // Aggregate attendance records within the specified date range
    const total = await attendanceModel.aggregate([
      {
        $match: { hostelName: hostelName }
      },
      {
        $unwind: "$attendanceRecords"
      },
      {
        $match: {
          "attendanceRecords.date": {
            $gt: new Date(lastgenDate),
            $lte: new Date(currentGenDate)
          }
        }
      },
      {
        $unwind: "$attendanceRecords.records"
      },
      {
        $match: {
          "attendanceRecords.records.studentId": new mongoose.Types.ObjectId(id),
          "attendanceRecords.records.status": "Present"
        }
      },
      {
        $count: "totalAttendances"
      }
    ]);

    // Update the last voucher generation date
    if (lastVoucher) {
      lastVoucher.lastTotalAttendance = total[0].totalAttendances,
        lastVoucher.lastgenDate = new Date(currentGenDate);
      await lastVoucher.save();
    } else {
      await messVoucherModel.create({
        studentId: id,
        hostelName,
        lastTotalAttendance: total[0].totalAttendances,
        lastgenDate: new Date(currentGenDate)
      });
    }
    // console.log("total ",total);

    res.status(200).json({ message: 'Attendance calculated successfully.', attendanceCount: total.length > 0 ? total[0].totalAttendances : 0 });
  } catch (error) {
    console.error('Error calculating attendance:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}



const createAttendance = async (req, res) => {
  const { hostelName, messTime, attendanceData } = req.body;

  try {
    let hostel = await attendanceModel.findOne({ hostelName });

    if (!hostel) {
      // Create a new hostel record if it doesn't exist
      hostel = await attendanceModel.create({ hostelName, attendanceRecords: [] });
    }

    // Get today's date in UTC without the time component
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);


    // Check if an attendance record for the same date and messTime already exists
    const existingRecord = hostel.attendanceRecords.find(
      record =>
        record.date.getTime() === today.getTime() && record.messTime === messTime
    );

    if (existingRecord) {
      return res.status(400).json({ message: 'Attendance for this mess time already submitted for today.' });
    }

    // Add the new attendance record
    hostel.attendanceRecords.push({ date: today, messTime, records: attendanceData });
    await hostel.save();

    res.status(200).json({ message: 'Attendance submitted successfully.' });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getWeeklyAttendance = asyncHandler(async (req, res) => {
  const { hostelName } = req.params;

  try {
    const hostel = await attendanceModel.findOne({ hostelName: hostelName });

    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    const attendanceRecords = hostel.attendanceRecords;

    // Process data to get daily present and absent counts
    const weeklyAttendance = {};

    attendanceRecords.forEach(record => {
      const date = record.date.toISOString().split('T')[0];
      if (!weeklyAttendance[date]) {
        weeklyAttendance[date] = { Present: 0, Absent: 0 };
      }

      record.records.forEach(att => {
        if (att.status === 'Present') {
          weeklyAttendance[date].Present += 1;
        } else if (att.status === 'Absent') {
          weeklyAttendance[date].Absent += 1;
        }
      });
    });

    res.status(200).json({ message: "Weekly Attendance", weeklyAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = {
  createAttendance,
  getMessAttendance,
  getWeeklyAttendance

}