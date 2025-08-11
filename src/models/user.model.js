const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")


const userSchema=new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            unique:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            unique:true
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudinary url
            required:true,
        },
        coverImage:{
            type:String, //cloudinary url
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String, //cloudinary url
            required:[true,"password is requried"],
        },
        refreshToken:{
            type:String
        }
       
    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        return next()
    }
    this.password=bcrypt.hash(this.password, 10);
    next();
})

//custome function add in userSchema

userSchema.methods.isPasswordCorrect=async function(password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this.id,
            email:this.email,
            fullName:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
     return jwt.sign(
        {
            _id:this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User=mongoose.model("User",userSchema);
module.exports =User;