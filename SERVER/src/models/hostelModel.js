const mongoose = require("mongoose")

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    floors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Floor'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Hostel', hostelSchema);
