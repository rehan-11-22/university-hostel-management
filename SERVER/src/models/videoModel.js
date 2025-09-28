const mongoose = require("mongoose")

const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        duration: {
            type: Number,
            require: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        videoFile: {
            type: String,  //for cloudinary url
            require: true,
        },
        thumbnail: {
            type: String,  //for cloudinary url
        },
        owner: {
            type: Schema.Type.ObjectId,
            ref: "Users"
        }
    },
    {
        timestamps: true,
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

module.exports = mongoose.model('Video', videoSchema)