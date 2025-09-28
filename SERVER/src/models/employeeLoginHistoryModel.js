const mongoose = require('mongoose');

const employeeLoginHistorySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    loginTime: {
        type: Date,
        required: true
    },
    loginStatus: {
        type: String,
        enum: ['success', 'failed'],
        required: true
    }
});

module.exports = mongoose.model('EmployeeLoginHistory', employeeLoginHistorySchema);
