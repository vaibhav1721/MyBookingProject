const Controller = require('../Controller')
const JoiValidator = require('../Lib/joiValidator')
const Joi  = require('joi');
module.exports=[
    {
 
        path:'/api/booking/createbooking',
        method:'POST',
        config: {  
            description: 'Get todo',
            notes: 'Returns a todo item by the id passed in the path',
            tags:['api','booking'],
                validate: {
                payload: JoiValidator.createBooking(),
                headers: Joi.object({
                    'token':Joi.string().required()
                }).unknown(),
            }
        },
        async handler(req, res) {
            try{
                const response = await Controller.BookingController.userBooking(req)
               
                return response
            }
            catch(error)
            {
                console.log(error);
                throw error
            }
            
        }
    },
    {
        path : '/api/booking/getBooking',
        method : 'POST',
        config: {  
            description: 'Get todo',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api','booking'],
            validate:{
                headers: Joi.object({
                    'token':Joi.string().required()
                }).unknown(),
            }
        },
        async handler(req,res){
            try{
            const response = await Controller.BookingController.getBookingById(req)
            return response
            }catch(error){
                throw error;
            }
        }
    },   

]