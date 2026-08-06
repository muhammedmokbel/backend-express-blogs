const express = require('express'); 
const catchAsync = require('../utils/catchAsync');
const { getAllBlogs, addBlog, deleteBlog, updateBlog } = require('../controllers/blogController');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const { addBlogSchema } = require('../schemas/blogs/addBlogSchema');
const { deleteBlogSchema } = require('../schemas/blogs/deleteBlogSchema');
const { updateBlogSchema } = require('../schemas/blogs/updateBlogSchema');


const router = express.Router(); 

router.route('/')
.get(authenticate() ,catchAsync(getAllBlogs))
.post(authenticate(), validate(addBlogSchema),catchAsync(addBlog))

router.route('/:id')
.delete(authenticate(), validate(deleteBlogSchema),catchAsync(deleteBlog))
.put(authenticate(),validate(updateBlogSchema) ,catchAsync(updateBlog))
.get(authenticate(), () =>{})




module.exports = router ; 