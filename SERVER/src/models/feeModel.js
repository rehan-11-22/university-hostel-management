const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
    feeType: {
        type: String,
        required: true
    },
    addmissionFee: {
        type: Number,
        default:0,
    },
    waterCharges: {
        type: Number,
        default:0,
    },
    utensilCharges: {
        type: Number,
        default:0,
    },
    roomRent: {
        type: Number,
        default:0,
    },
    newsPaperPlussTelephoneCharges: {
        type: Number,
        default:0,
    },
    messSecurity: {
        type: Number,
        default:0,
    },
    
    messCharges: {
        type: Number,
        default:0,
    },
    maintenancesCharges: {
        type: Number,
        default:0,
    },
    hostelSecurity: {
        type: Number,
        default:0,
    },
    hostelIdentityCardFee: {
        type: Number,
        default:0,
    },
    gassCharges: {
        type: Number,
        default:0,
    },
    fine: {
        type: Number,
        default:0,
    },
    electricityCharges: {
        type: Number,
        default:0,
    },
    commonRoomFee: {
        type: Number,
        default:0,
    },
    bankName: {
        type: String,
        require: true,
    },
    accountNumber: {
        type: String,
        require: true,
    },

    createdBy: {
        email: {
            type: String,
            require: true,
            default: "suprident@gmail.com"
        },
        id: {
            type: String,
            require: true,
            default: "klsadjfwr8syf98ysifhnhfhd4"
        },

    },
},
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Fee', feeSchema)