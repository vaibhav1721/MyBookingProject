const Services = require('../Services')
const ResponseSend = require('../Lib/responseSend')
var ObjectId = require('mongodb').ObjectID;
async function userBooking(req,res) {
    try{
        let token = await Services.UserService.verifyTookan(req.headers.token,'shhhhhaaa');
        console.log("..........token id ........"+token);
        
        req.payload.user_id = ObjectId(token)
        let userData = await Services.BookingService.createBooking(req,token)
        return ResponseSend.sendSuccess(req.payload,userData)

    }
    catch(error){
        console.log(error)
        return ResponseSend.sendError(error);

    }
}

async function getBookingById(req,res){
    try{
    console.log("inside booking service");
    let token = await Services.UserService.verifyTookan(req.headers.token,'shhhhhaaa');
    const getData = await Services.BookingService.getAllBooking(token);
    return getData
    }catch(err){
        return ResponseSend.sendError('Error while getting');
    }
}

module.exports={
    userBooking:userBooking,
    getBookingById:getBookingById
}