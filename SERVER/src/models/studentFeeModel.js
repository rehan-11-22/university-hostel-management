const mongoose = require("mongoose");

const studentFeeSchema = new mongoose.Schema(
    {
        hostelName: {
            type: String,
            require: true,

        },
        studentName: {
            type: String,
            require: true
        },
        studentcnic: {
            type: String,
            require: true
        },
        feeType: {
            type: String,
            require: true,
            lowercase: true,
        },
        totalAmount: {
            type: Number,
            require: true,
        },
        feeStatus: {
            type: String,
            default: "unpaid"
        },
        createdBy: {
            userId: {
                type: String,
                require: true
            },
            userEmail: {
                type: String,
                require: true
            }
        },
        updatedBy: {
            userId: {
                type: String,
            },
            userEmail: {
                type: String,
            }
        }

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('StudentFee', studentFeeSchema)