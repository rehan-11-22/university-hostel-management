const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema(
    {
        role:
        {
            type: String,
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
        gender: {
            type: String,
            require: true,
        },
        cnic: {
            type: String,
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
        // profileImage: {
        //     type: String,  //for cloudinary url
        // },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        isEmailConrmation: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        createDate: {
            type: Date,
        },
        updateDate: {
            type: Date,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)


userSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)

}


userSchema.methods.genrateAccessToken = function () {
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
userSchema.methods.genrateRegreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "2d"
        }
    )
}


module.exports = mongoose.model('users', userSchema)