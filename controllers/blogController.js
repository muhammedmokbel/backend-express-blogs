const Blog = require("../models/blogModel")
const APIFeatures = require("../utils/ApiFeatures");
const { NotFoundError, ValidationError } = require("../utils/ErrorHandlers");


exports.getAllBlogs = async (req, res, next) => {

    const features = new APIFeatures(Blog.find(),req.query).filter().sort().pagination().limitFields();
    const response = await features.query; 
    const pageinationInfo = await features.getPaginationInfo(Blog); 
    
    return res.status(200).json({
        status : 'success', 
        data : {
            blogs : response 
        },
        pageinationInfo
    })
    
}

exports.addBlog = async (req, res, next) => {
    const {title, text} = req.body
    const blog = await Blog.create({
        title, 
        text, 
        user : req.user._id 
    }); 

    return res.status(201).json({
        status : 'success', 
        data : {
            blog 
        }
    })
}

exports.deleteBlog = async (req, res, next) => {
    const {id} = req.params;
    
    const isDocExist = await Blog.findOneAndDelete({_id : id , user : req.user._id}); 
    if (!isDocExist)
        return next(new NotFoundError('this document is not exist')); 

    return res.status(204).json()
}

exports.updateBlog = async (req, res, next) => {
    const {id} = req.params; 

    const newBlog = await Blog.findOneAndUpdate({_id : id , user : req.user._id},{...req.body},{runValidators:true ,returnDocument : 'after'}); 
    
    if (!newBlog)
        return next(new ValidationError('this document is not exist'))

    return res.status(200).json({
        status : 'success', 
        data : {
            blog : newBlog
        }
    })

}