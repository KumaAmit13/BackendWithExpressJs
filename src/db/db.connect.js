const mongoose=require("mongoose")
const {DB_NAME}=require("../constants.js")


const connectDb=async()=>{
    try {
       const connectionInstance=  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
       console.log("mongo db connected  Db Host :", connectionInstance.connection.host);
    } catch (error) {
        console.log("mongodb connection error",error);
        process.exit(1);
    }
}

module.exports = connectDb;
