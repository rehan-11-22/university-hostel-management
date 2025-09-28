const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const stdSchema = new mongoose.Schema(
    {
        role:
        {
            type: String,
            default: "student",
            require: true,
            lowercase: true,
        },
        username: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullname: {
            type: String,
            require: true,
            trim: true,
        },
        religion: {
            type: String,
            require: true,
        },
        homeAdress: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: Number,
            require: true,
        },
        matrialStatus: {
            type: String,
            require: true,
        },
        nationality: {
            type: String,
            require: true,
        },
        state: {
            type: String,
            require: true,
        },
        city: {
            type: String,
            require: true,
        },
        gender: {
            type: String,
            require: true,
        },
        cnic: {
            type: String,
            require: true,
        },
        dob: {
            type: Date,
            require: true,
        },
        status: {
            type: String,
            default: "deActive",
        },
        avatar: {
            type: String,  //for cloudinary url
            require: true,
        },
        coveimage: {
            type: String,  //for cloudinary url
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        isEmailConrmation: {
            type: Boolean,
            default: false,
        },
        dept: {
            type: String,
            require: true,
        },
        discipline: {
            type: String,
            require: true,
        },
        section: {
            type: String,
            require: true,
        },
        hostelName: {
            type: String,
            require: true,
        },
        rollNumber: {
            type: Number,
            require: true,
        },
        session: {
            type: String,
            require: true,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)


stdSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)

}


stdSchema.methods.genrateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "2d"
        }
    )
}
stdSchema.methods.genrateRegreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "2d"
        }
    )
}


module.exports = mongoose.model('Students', stdSchema)