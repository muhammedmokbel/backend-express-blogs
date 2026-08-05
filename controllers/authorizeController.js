const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const { ValidationError } = require("../utils/ErrorHandlers");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");



exports.signup = async (req , res, next) => {
   
    const {email , firstName , lastName , password, passwordConfirm , acceptTerms} = req.body
    // check if this user email already exist 
    const isUserExist = await User.find({ email}).countDocuments();
    if (isUserExist)
        return next(new ValidationError('this email already exist')); 
   // generate verify token and hashed
    const verifyToken = crypto.randomBytes(32).toString('hex'); 
    const verifyTokenHashed = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");
    // thirty minutes for expiration 
    const verifyTokenExpiriedTime  = Date.now() + 30 * 1000 * 60 ; 
 
    // create user
    const currentUser = await User.create({
        firstName, 
        lastName, 
        email, 
        password , 
        acceptTerms , 
        verifyTokenHashed , 
        verifyTokenExpiriedTime
    })

        // sending verification mail 
    await sendEmail({
        from : process.env.APP_EMAIL, 
        to : email, 
        subject : 'Verification Email', 
        text : `please click this verification link ${req.protocol+'://'}${req.host+'/'+'verify'+'/'}${verifyTokenHashed}`
    })

   return  res.status(201).json({
        status :'success', 
        data : {
            user : currentUser 
        }
    })
}

exports.login = async (req, res,next) =>{
    const {email , password} = req.body;
    // check if this email exist in database 
    const currentUser = await User.findOne({email}).select('+password'); 
    if (!currentUser)
        return next(new ValidationError('this email or password is incorrect')); 
    // hash incoming password to compare with hashed password in database 
     const isPasswordMatch = await bcrypt.compare(password , currentUser.password); 
     if (!isPasswordMatch)
        return next(new ValidationError('this email or password is incorrect'))
    // check if the email already verified 
    if (!currentUser.isEmailVerified)
        return next(new ValidationError('this email is not verified please verify your email to be able to login'))
    // generare jwt with user payload 
    const token = jwt.sign(currentUser.toJSON(), process.env.SECRET, {expiresIn : process.env.EXPIRES_TOKEN_TIME})

   return  res.status(200).json({
        status :'success', 
        user : currentUser, 
        token 
    })

}

exports.verifyToken = async (req, res, next) => {
    const {verifyToken} = req.params; 
    const currentUser = await User.findOne({verifyTokenHashed : verifyToken}).select('+verifyTokenExpiriedTime +verifyTokenHashed');
    if (!currentUser)
        return  next(new ValidationError("this token maybe invalid or expired")); 

    const isTokenExipried =  currentUser.verifyTokenExpiriedTime?.getTime() < Date.now(); 
    if (isTokenExipried)
        return next(new ValidationError("this token maybe invalid or expired")); 
    currentUser.verifyTokenHashed = null; 
    currentUser.verifyTokenExpiriedTime = null ;
    currentUser.isEmailVerified = true ;
    await currentUser.save({validateBeforeSave : true}); 

    return res.status(200).json({
        status : 'success', 
        data : {
            user : currentUser.toJSON()
        }
    })

}

exports.forgetPassword = async (req, res, next) => {
    const {email} = req.body; 
    const currentUser = await User.findOne({email}); 
    if (!currentUser)
        return next(new ValidationError('If an account with that email exists, a password reset link has been sent.')); 

    // generate reset token 
    const resetToken = crypto.randomBytes(32).toString('hex'); 
    const resetTokenHashed = crypto.createHash('sha256').update(resetToken).digest('hex'); 
    const resetTokenExpiriedTime = Date.now() + 30 * 1000 * 60 ; 
    currentUser.resetTokenHashed = resetTokenHashed; 
    currentUser.resetTokenExpiriedTime = resetTokenExpiriedTime; 
    await currentUser.save({validateBeforeSave : true}); 

    // sending reset link on mail 
    await sendEmail({
        from : process.env.APP_EMAIL,
        to:email ,
        subject : 'Forget password', 
        text : `please click this forget password link ${req.protocol+'://'}${req.host+'/'+'reset-password'+'/'}${resetTokenHashed}`
    })

     return res.status(200).json({
        status : 'success', 
        data : {
            user : currentUser.toJSON()
        }
    })

}

exports.resetPassword = async (req, res, next) => {
    const {resetToken} = req.params;
    const {password} = req.body
    // check if the token exist  
    const currentUser = await User.findOne({resetTokenHashed : resetToken}).select("+resetTokenHashed +resetTokenExpiriedTime"); 
    if (!currentUser)
        return next(new ValidationError('the resetToken is not valid')); 

    // check if the token is not expired 
    const isTokenExpired = Date.now() > currentUser.resetTokenExpiriedTime?.getTime(); 
    if (isTokenExpired)
        return next(new ValidationError('the resetToken is expired')); 
    // updating the password with the new one
    currentUser.password = password; 
    // set the resetToken and timer by null
    currentUser.resetTokenHashed = null; 
    currentUser.resetTokenExpiriedTime = null; 
    await currentUser.save({validateBeforeSave : true }); 

    return res.status(200).json({
        status : 'success', 
        data : {
            user : currentUser
        }
    })

    
}
