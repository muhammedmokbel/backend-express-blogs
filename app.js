// modules
const express = require('express'); 

//routes 
const AuthRouter = require('./routes/AuthRoutes');
const BlogRouter = require('./routes/BlogRoutes')

// https://expressjs.com/en/resources/middleware/

//middlewares 
const errorMiddleware = require('./middlewares/errorMiddleware');


const app = express(); 


//config middlewares 
app.use(express.json({limit : '50kb'}))


app.get('/health', (req,res) =>{

    res.json({
        status : 'success', 
        data : {
            message : 'server is up and running!'
        }
    })
})

// routers (sub-applications)
app.use('/authorize',AuthRouter); 
app.use('/blogs',BlogRouter)

app.use(errorMiddleware)




module.exports = app; 