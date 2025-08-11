const express=require("express")
const cors=require('cors')
const cookieParser=require('cookie-parser')

const app=express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(cookieParser())

app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended:true,limit:"20kb"}));
app.use(express.static("public"));//Serves static files from 
// public/ eg: public/logo.png, visiting http://yourserver.com/logo.png.

app.get("/", (req, res) => {
    res.send("hii");
});

//routes
const userRouter =require('./routes/user.routes.js');

app.use("/api/v1/users",userRouter)

//http:localhost:3000/api/v1/users/register
module.exports =app;