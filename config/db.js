const mongoose = require('mongoose'); 


const getConnectionString = () => process.env.DB_CONNECTION?.replace('<DBNAME>',process.env.DB_NAME)

exports.connectDB = async () => {
    try 
    {
     await mongoose.connect(getConnectionString(),{writeConcern : {w : 'majority', journal : true}});
     console.log("DB connection is succeed")
    }
    catch(err)
    {
        console.log(err)
    }
}