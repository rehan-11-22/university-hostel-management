const cloudinary = require('cloudinary')
const fs = require("fs")


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload File on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // File uploaded successfully
        // console.log("File is uploaded on cloudinary ", response);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return nullٖ
    }
}

module.exports = { uploadCloudinary };

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function (error, result) { console.log(result); });