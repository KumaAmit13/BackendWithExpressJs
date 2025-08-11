const upload = require("../middlewares/multer.middleware.js");
const User = require("../models/user.model.js");
const ApiError = require("../utils/ApiErrors.js");
const asyncHandler = require("../utils/asyncHandler.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, userName, pasword } = req.body;

    if (
        [fullName, email, userName, pasword].some((element) => element?.trim() === "")
    ) {
        throw new ApiError(400, "All fileds are required")

    }

    const duplicateUser = User.findOne({ $or: [{ userName }, { email }] });

    if (duplicateUser) {
        throw new ApiError(401, "user alReady registered..")
    }
    // console.log("files",req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coberImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        return new ApiError(400, "acatar file is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coberImage = await uploadOnCloudinary(coberImageLocalPath);
    if (!avatar) {
        return new ApiError(400, "acatar file is required cloudinary");
    }

    const user=User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coberImage?.url || "",
        email,
        password,
        userName:userName.toLowerCase()
    })

    //fliter two filed from user

    const createUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    return res.status(201).json(
        new ApiError(200,createUser,"User registered....")
    )

})


module.exports = registerUser;