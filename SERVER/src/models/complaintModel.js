const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true
    },
    complaintType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
      
    },
    status: {
        type: Array,
        default : ["pending"]  // pending, processing , success ,
      
    },
   
}, { timestamps: true });
module.exports = mongoose.model('Complaints', complaintSchema)

// const Complaints = mongoose.model('Complaints', complaintSchema);

// module.exports = Complaints;
