const Controller = require('../Controller')
const JoiValidator = require('../Lib/joiValidator')

module.exports=[

    /*
    Get user details with Id
     */
{
   
        path:'/api/user/findByEmail',
        method:'POST',
        config: {
            
            description: 'find user by id',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api','user'],
            validate: {
                payload: JoiValidator.userGetByEmail()
                }
            },
            async handler(req, res) {
                const response = await Controller.UserController.userDetail(req)
                return response
            },
},

    /*
     Sign up function for user
     */

{
        path:'/api/user/create',
        method:'POST',
        config: {
            
            description: 'Get todo',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api','user'],
            validate: {
                payload: JoiValidator.signUp()
                }
            },
            
        async handler(req, res) {
         //   req.body.ip =req.headers.host;
            const response = await Controller.UserController.userSignup(req)
            //console.log(response);
            return response
        }
     },
    /*
     Login function for user
     */


   {
        path:'/api/user/login',
        method:'POST', 
        config: {
            
            description: 'Get todo',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api','user'],
            validate: {
                payload: JoiValidator.login()
                },
            },

         async handler(req, res) {
           //req.body.ip =req.headers.host;
           const response = await Controller.UserController.userLogin(req)
           return response
       }
     }
]



   


