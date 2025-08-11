const {v2: cloudinary}=require('cloudinary');

const fs=require("fs")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // ensures HTTPS URLs
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            console.log("cloud't find the file path")
            return null;
        }

        //upload on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })

        console.log("file uploaded on cloudinary",response);
        return response;
    } catch (error) {
        fs.unlink(localFilePath);
        console.log("file upload filed on clodinary")
        return null;
    }
}

module.exports=uploadOnCloudinary;