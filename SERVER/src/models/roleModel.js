const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        roleType: {
            type: String,
            require: true,
            lowercase: true,
        },
        permission: {
            type: String,
            require: true,
            lowercase: true,
        }

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Roles', roleSchema)