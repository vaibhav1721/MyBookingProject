
//var ObjectID = require("bson-objectid");
const jwt = require('jsonwebtoken')
const Boom = require('boom')
const ResponseSend = require('../Lib/responseSend')
var ObjectId = require('mongodb').ObjectID;

async function emailCheck(req, callback){
    const Model =  db.collection('customer')
    try {
        const emailDataCheck = await  Model.findOne({email:req.payload.email});
        // if(emailDataCheck == null){
        //     return emailDataCheck
        // } else {
        //    console.log("Email Exist") 
        // }
        console.log(emailDataCheck)
        return emailDataCheck

    } catch (error) {
        throw error;
    }
}


async function getUserById(email, callback){
    const Model =  db.collection('customer')
    try {
       
        const userData = await  Model.findOne({email});

        if(userData == null){
            throw "Not Found"
        } else {
            return userData
        }

    } catch (error) {
        throw error;
    }
}

async function createUser(data, callback){
    try {
        const Model =  db.collection('customer')
        
        let data1=
            {  userName:data.payload.userName,
                firstName: data.payload.firstName,      
                lastName:data.payload.lastName,
                email: data.payload.email,
                mobile:data.payload.mobile,
                password:data.payload.password
           }
        const userInsert = await Model.insert(data1)
        const b = {
            userName:userInsert.ops[0].userName,
            firstName:userInsert.ops[0].firstName,
            lastName:userInsert.ops[0].lastName,
            email:userInsert.ops[0].email,
            mobile:userInsert.ops[0].mobile
        }
        return b
      } catch (error) {
          console.log(error);
        throw error;
      }
}



async function loginUser(req, callback){
    const Model =  db.collection('customer')
    try {
        const userData = await  Model.findOne(
            ObjectId(req));
        console.log(userData)
        const b = {
            userName:userData.userName,
            firstName:userData.firstName,
            lastName:userData.lastName,
            email:userData.email,
            mobile:userData.mobile
        }
        if(b == null){
            throw "User Not Found"
        } else {

            console.log("Login Succesfully "+req)
            const tkn = {
                _id: b._id
            }
            let token = jwt.sign(req,'shhhhhaaa')
            b.token=token
           // return ResponseSend.sendSuccess(data.payload,b)
              return b
        }

    } catch (error) {
        throw error;
    }
}

async function verifyTookan(req,res){
    try{
        console.log("inside reque/...../"+req+" secret key "+ res);
       const isValid = await jwt.verify(req,res);
       console.log("after verifying "+isValid);
       return isValid;
        
    }
    catch(err)
    {
        return Boom.unauthorized("not auth")
    }
} 

module.exports = {
    emailCheck: emailCheck,
    createUser: createUser,
    getUserById:getUserById,
    loginUser:loginUser,
    verifyTookan:verifyTookan
   
}