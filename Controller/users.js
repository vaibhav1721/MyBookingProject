const Services = require('../Services')
const ResponseSend = require('../Lib/responseSend')
const Boom = require('boom')
async function userSignup(req, callback){
    try {
     
        let userData= await Services.UserService.emailCheck(req);
       console.log(userData)
        if(userData==null){
            const createeUser = await Services.UserService.createUser(req);
           global.createeUser=createeUser
        }
        else
        {
           return Boom.badRequest("User Already Exist")
        }
    //    return createUser 
    
    return ResponseSend.sendSuccess(req.payload,createeUser)
    }
     catch (error) {
        
        return ResponseSend.sendError(error);
 
    }

}



async function userDetail(req){
    try {

        const userData = await Services.UserService.getUserById(req.payload.email);

        return ResponseSend.sendSuccess(req.payload,userData)

    } catch (error) {
        return ResponseSend.sendError(error);

    }



}



async function userLogin(req){
    try {
      const userData = await Services.UserService.loginUser(req.payload._id);      
      return ResponseSend.sendSuccess(req.payload,userData)

    } catch (error) {
        return ResponseSend.sendError(error);

    }



}


module.exports = {
    userSignup: userSignup,
    userDetail:userDetail,
    userLogin:userLogin,
  
}