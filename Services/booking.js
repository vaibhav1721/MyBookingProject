//var ObjectID = require("bson-objectid");
//const m = require('./Model')
const Jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;
const ResponseSend = require('../Lib/responseSend')
async function createBooking(req,token){
    try{
        // const customerModel = db.collection('customer');
        // const userData = await customerModel.findOne({email:req.payload.email})
        // console.log(userData)
        // console.log("userIDsda")
        // let userID = userData._id;
        // console.log("userID")
        
        const bookingModel = db.collection('newbooking');
   
        // let data2={
        //     seat:req.payload.seat,
        //     address:[{
        //         location:req.payload.location,
        //         zipcode:req.payload.zipcode
        //     }]
        // }
        console.log(req.payload);0
        const bookingInsert = await bookingModel.insert(req.payload);
        console.log(bookingInsert)
       return bookingInsert;
    }
    catch(error){
       // console.log(error)
       console.log("error")
        throw error
    }
}

async function getAllBooking(id){
    try{
    console.log(id);
    const bookingCollection = db.collection('newbooking');
    const customerCollection = db.collection('customer');
    
    let returnedData = await bookingCollection.aggregate([
        {
            $lookup:{
                from : 'customer',
                localField:'user_id',
                foreignField :'_id',
                as: "demo"
            }
        },
        {
             $match : {
                    user_id:ObjectId(id)
             }
         }
    ]).toArray();

    // returnedData.forEach(element => {
    //     delete element.user_id;
    //     delete element.address;
    // });

    for(let element = 0 ;element<returnedData.length ;element++){
         delete returnedData[element].user_id;
    }
    console.log(returnedData)
    return returnedData
}catch(err){
    console.log(err);
    throw err;
}   
}


module.exports={
    createBooking:createBooking,
    getAllBooking:getAllBooking
}