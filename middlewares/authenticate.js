const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { UnauthorizedError } = require("../utils/ErrorHandlers");
const jwt = require('jsonwebtoken')

const authenticate = (roles = [], permissions = []) => {
    return catchAsync(async function (req , res, next) {
        
        // check if token exist in authorization header  
        const tokenHeader = req.headers.authorization; 
     
        if (!tokenHeader)
            return next(new UnauthorizedError()); 
        // check if the token is barear token 
        const [tokenType , token] = tokenHeader?.split(' '); 
        if (tokenType?.toLowerCase() !== 'bearer')
            return next(new UnauthorizedError()); 
        // check the if the token valid  and check if token expried 
        
        const userData = jwt.verify(token,process.env.SECRET); 
    
        // check if the user of this token still exist in database 
        const currentUser = await User.findOne({_id : userData._id}); 
        if (!currentUser)
            return next(new UnauthorizedError()); 

        // check if the user change password after this token issued 
        if (currentUser.passwordChangedAt)
        {
            const issuedTime = userData?.iat * 1000 ; // convert seconds into mileseconds ; 
            if ( currentUser.passwordChangedAt.getTime() > issuedTime)
            return next(new UnauthorizedError()); 
        }
            

        // attach user to req 
        req.user = userData; 

        // jump to next handler good luck ;) 
        next(); 
        
    })
}

module.exports = authenticate; 