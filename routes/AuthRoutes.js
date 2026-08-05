const express = require('express'); 
const { login, signup, verifyToken, forgetPassword, resetPassword } = require('../controllers/authorizeController');
const catchAsync = require('../utils/catchAsync');
const validate = require('../middlewares/validate');
const { signupSchema } = require('../schemas/authorize/signupSchema');
const { loginSchema } = require('../schemas/authorize/loginSchema');
const { verifySchema } = require('../schemas/authorize/verifySchema');
const { forgetPasswordSchema } = require('../schemas/authorize/forgetPasswordSchema');
const { resetTokenSchema } = require('../schemas/authorize/resetToken');


const router = express.Router() ;

router.post('/login', validate(loginSchema) ,catchAsync(login)); 
router.post('/signup', validate(signupSchema),catchAsync(signup));
router.post('/verification/:verifyToken', validate(verifySchema),catchAsync(verifyToken))
router.post('/forget-password',validate(forgetPasswordSchema), catchAsync(forgetPassword))
router.post('/reset-password/:resetToken',validate(resetTokenSchema), catchAsync(resetPassword))


module.exports = router; 