const app = require('./app');
require('dotenv').config();
const connectDb=require("./db/db.connect")


connectDb()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error",error);
        throw error;
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log("server running on port ",process.env.PORT)
    }
)
})
.catch((error)=>{
    console.log("Mongo Db connection falied")
});

