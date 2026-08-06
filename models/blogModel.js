const mongoose = require('mongoose'); 


const schema = new mongoose.Schema({
    title : {
        type : String, 
        required : true, 
        minLength : [3,'the text of title should be more than or equal 1 character '], 
        maxLength : [100, 'the text of title should be less than or equal 100 character']
    }, 
    text : {
        type : String, 
        required : true , 
        minLength : [250,'the text of title should be more than or equal 250 character '], 
        maxLength : [1000, 'the text of title should be less than or equal 1000 character']
    }, 
    commentsCount : {
        type : Number , 
        default : 0
    }, 
    user : {
        type : mongoose.Schema.ObjectId, 
        ref : 'User', 
        required : true
    }
},{timestamps : true  })

const Blog = mongoose.model('Blog',schema); 

module.exports = Blog; 