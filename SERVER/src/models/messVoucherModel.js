const mongoose = require("mongoose")

const messVoucherSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    hostelName: { type: String, required: true },
    lastTotalAttendance: { type: String, required: true },
    lastgenDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('MessVoucher', messVoucherSchema);
