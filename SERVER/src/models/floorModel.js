const mongoose = require("mongoose")


// const floorSchema = new mongoose.Schema(
//     {
//         floorNumber: {
//             type: String,
//             require: true,
//         },
//         createdBy: {
//             email: {
//                 type: String,
//                 require: true,
//             },
//             id: {
//                 type: String,
//                 require: true,
//             },

//         },
//         rooms: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Rooms',
//             populate:{path:"Rooms"}
//         }] // Reference to Room
//     },
//     {
//         timestamps: true,
//     }
// )


// module.exports = mongoose.model('Floors', floorSchema)
const floorSchema = new mongoose.Schema({
    floorNumber: {
        type: Number,
        required: true
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Floor', floorSchema);
