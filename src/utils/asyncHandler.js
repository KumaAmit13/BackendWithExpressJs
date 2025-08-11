
const asynHandler=(requestHandler)=> (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).
    catch((error)=>{next(error)});
}

module.exports=asynHandler;













// const asynHandler=(fn)=> async(req, res ,next)=>{
//     try {
//         await fu(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }










