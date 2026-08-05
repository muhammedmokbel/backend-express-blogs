const mongoose = require('mongoose'); 
const validator = require('validator'); 
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
    firstName : {
        type : String, 
        required : true  ,
        maxLength : [250 , "the text of firstName should be less than or equal 250 character"], 
        minLength : [1,  "the text of firstName should be more than or equal 1 character ",]
    }, 
    lastName : {
     type : String, 
        required : true  ,
        maxLength : [250 , "the text of firstName should be less than or equal 250 character"], 
        minLength : [1,  "the text of firstName should be more than or equal 1 character ",]
    }, 
    email : {
        type : String, 
        required : true, 
        validate: [validator.isEmail, "please Enter valid format for email"],
        unique: [true, "this email already exist"],
    }, 
    password : {
        type : String , 
        required : true , 
        select : false ,
        validate :[
     (value) => 
       
       validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
  
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ],
    }, 
      acceptTerms : {
        type : Boolean, 
        default : false , 
        required : true 
    }, 
    isEmailVerified : {
        type : Boolean, 
        default : false , 
    },
    verifyTokenHashed : {
        type : String , 
        select : false 
    }, 
    verifyTokenExpiriedTime : {
        type : Date , 
        select : false
    }, 
      resetTokenHashed : {
        type : String , 
        select : false 
    }, 
    resetTokenExpiriedTime : {
        type : Date , 
        select : false
    }
},{timestamps : true,
    toJSON : 
    {transform : (doc,ret) => {
        delete ret.__v;
        delete ret.password; 
        delete ret.verifyTokenHashed;
        delete ret.verifyTokenExpiriedTime; 
        delete ret.resetTokenHashed, 
        delete ret.resetTokenExpiriedTime; 
        return ret; 
    }}
})

schema.pre('save',async function() {
    if (!this.isModified('password')) return ; 

    this.password = await bcrypt.hash(this.password,12); 

})



const User = mongoose.model('User',schema)

module.exports = User ; 