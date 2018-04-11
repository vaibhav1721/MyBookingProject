
const Joi = require("joi")
const dataBase=require('../server')
//const dataBaseConstant = require('../Constants').dataBase.dataBaseConstant
class joiValidator {

   static signUp(){
        const signUpJoi = {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            userName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required().description('password must contain at least one capital letter, small letter, digit with minimum 8 character'),
            mobile: Joi.string().required()
        }
        return signUpJoi
    }

    static userGetByEmail(){
        const userGetByEmailJoi = {
            email: Joi.string().required()

        }
        return userGetByEmailJoi
    }
 

    static login(){
        const loginJoi = {
           _id : Joi.string().required()
        }
        return loginJoi
    }
    static createBooking(){
        const createBookingJoi = {
            seat: Joi.number().required(),
             address: Joi.object().keys({
                location: Joi.string().required(),
                zipcode: Joi.string().required()
            })
        }
        return createBookingJoi
    }

}









module.exports = joiValidator