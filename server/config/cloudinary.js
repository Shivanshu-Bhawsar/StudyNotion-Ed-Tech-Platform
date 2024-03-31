const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log("Cloudinary connect successfully");
    }
    catch(err){
        console.log("Error in cloudinary connection", err);
    }
}