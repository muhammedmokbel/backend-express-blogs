const dotenv = require('dotenv'); 
dotenv.config({path :'./.env.local'})

const app = require('./app')
const {connectDB} = require('./config/db')



const startServer = async () => {

    try 
    {
        await connectDB(); 

        app.listen(process.env.PORT,() => {
            console.log("server is up and running !!")
        })
    }
    catch(err) {
        console.log(err)
    }

}

startServer(); 