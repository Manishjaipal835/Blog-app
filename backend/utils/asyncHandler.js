const asyncHandler = (requestHandler)=>async (req,res,next)=>{
  try {
   return await requestHandler(req,res,next);
  } catch (err) {
   return res
          .status(err.code || 500)
          .json({message:err.message,success:false})
  }
}

module.exports = {asyncHandler};