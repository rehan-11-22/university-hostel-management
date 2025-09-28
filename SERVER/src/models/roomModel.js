const mongoose = require("mongoose");

// const roomSchema = new mongoose.Schema({
//     roomNumber: {
//         type: Number,
//         required: true
//     },
//     // type: {
//     //     type: String,
//     //     required: true
//     // },
//     capacity: {
//         type: Number,
//         require: true,
//     },
//     isAvailable: {
//         type: Boolean,
//         default: true
//     },
//     students: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Students',
//     }] // Reference to Room
//     // createdBy: {
//     //     email: {
//     //         type: String,
//     //         require: true,
//     //     },
//     //     id: {
//     //         type: String,
//     //         require: true,
//     //     },

//     // },
// },
//     {
//         timestamps: true,
//     }
// );


// module.exports = mongoose.model('Rooms', roomSchema)
const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, { timestamps: true });


// Pre-save hook to check if room is full
roomSchema.pre('save', async function (next) {
    try {
        if (this.students.length >= this.capacity) {
            this.isAvailable = false; // Set isAvailable to false if capacity is reached
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Room', roomSchema);
