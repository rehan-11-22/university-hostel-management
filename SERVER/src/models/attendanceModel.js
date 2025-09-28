// const mongoose = require("mongoose");

// const attendanceSchema = new mongoose.Schema({
//     hostelName: {
//         type: String,
//         // required: true
//     },

//     attendanceRecords: [
//         {
//             studentId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Student',
//                 required: true
//             },
//             status: {
//                 type: String,
//                 enum: ['Present', 'Absent'],
//                 required: true
//             }
//         }
//     ]
// },
//     {
//         timestamps: true,
//     }
// );


// module.exports = mongoose.model('Attendance', attendanceSchema)
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    hostelName: {
        type: String,
        required: true
    },
    attendanceRecords: [{
        date: {
            type: Date,
            default: new Date()
        },
        messTime: {
            type: String,
            required: true
        },
        records: [{
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            },
            status: {
                type: String,
                enum: ['Present', 'Absent'],
                required: true
            }
        }]
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);
