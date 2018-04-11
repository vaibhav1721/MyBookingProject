
const Routes = require('./Routes') 
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Hapi = require('hapi')
const db = require('./dbconnection');
const Pack = require('./package');

(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3000,
    });
    
    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: Pack.version,
            },
            grouping:'tags'
        };
    
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
]);
try {
    await server.start();
    console.log(`the sever is started :${server.info.uri}`)

   let database = await db.dbConnection()
     global.DATABASE = database

 } catch (err){
     console.log(err)
 }

server.route(Routes.userRoutes)
server.route(Routes.bookingRoutes)
})();

// async function connectDatabase() {
//     try {
//        await server.start();
//        console.log(`the sever is started :${server.info.uri}`)

//       let database = await db.dbConnection()
//         global.DATABASE = database

//     } catch (err){
//         console.log(err)
//     }

// }
// connectDatabase();










