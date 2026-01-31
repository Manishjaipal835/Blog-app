export const authUser = async function(req,res,next) {
    try {
        const token = req?.cookies
          console.log(req);
          
    } catch (error) {
       return res.status(500).json({message:"internal server error",success:fase})
    }
}