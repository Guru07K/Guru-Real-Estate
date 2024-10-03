const User = require("../model/authModel")
const bcrypt = require('bcryptjs');
const { errorHandler } = require("../utils/error");
const ErrorHandler = require("../utils/error");
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dygz6jcul', 
    api_key: '121292131527499', 
    api_secret: '4iy48UIEVq0_btvVn5lvx7CnZR8' 
});


// Register handler /api/user/register
exports.register = async (req, res, next) => {
    const {name, email, password} = req.body
    
    const hashedPassword = await bcrypt.hash(password,10);

    let avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7tyEA8rRXZabfLf_AwxDy-vQ91ecjMJjxVw&s';
    let publicId;
    if(req.body.avatar){
        avatar = req.body.avatar
        publicId = req.body.publicId
    }
    
    try {
        const user = await User.create({
            name,
            email, 
            password:hashedPassword, 
            avatar : {
                public_id : publicId,
                url : avatar
                }
            });

        const {password:pass, ...rest} = user.toObject()
    
        res.status(201).json({
            message: "User registered successfully",
            user : rest
        })
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        return next(new ErrorHandler('user already exsist', 400))
    }
}

// Login api handler /api/user/signin
exports.signIn = async (req, res, next) => {

    const {email, password} = req.body

    if(!email){
        return next(new ErrorHandler('Email is required',400))
    }else if(!password){
        return next(new ErrorHandler('Password is required',400))
    }

    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler('User not found', 404))
    } 
    
    const validPassword = await bcrypt.compare(password,user.password)
    
    if(!validPassword) {
       return next(new ErrorHandler('password is not correct', 404))
    }

    const token = jwt.sign({id:user._id},process.env.SECRET_TOKEN_KEY)
    const {password:pass, ...rest} = user.toObject()

    res.cookie('token', token)
       .status(200)
       .json({
        success : true,
        message : 'login successfully',
        user : rest,
        token
       })
       
}

// Update user api handler /api/user/updateProfile
exports.updateProfile = async (req, res, next) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    
    let newUserData = {};
    
    if (req.body.name) newUserData.name = req.body.name;
    if (req.body.email) newUserData.email = req.body.email;
    if (req.body.password) newUserData.password = await bcrypt.hash(req.body.password, 10);
    if (req.body.avatar){
        newUserData.avatar = {
            url: req.body.avatar,
            public_id: req.body.public_id
        };
    } 
    

    const user = await User.findByIdAndUpdate(decoded.id, newUserData, { new: true });
    
    res.status(200).json({
        success: true,
        user
    });
};

// DELETE Cloudinary profile picture
exports.deleteCloudinaryPicture = async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.destroy(req.body.public_id);
        res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

// Delete user api handler /api/user/delete/:id
exports.deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id)
    
        res.clearCookie('token')
           .status(200)
           .json({
            success: true,
            message: 'User deleted successfully'
           })
    } catch (error) {
        next(error)
    }

}

// Logout user api /api/user/logout
exports.logOut = async (req, res, next ) => {
    res.clearCookie('token')
    .status(200)
    .json({
        success: true,
        message: 'User logged out successfully'
    })
}


exports.getUserById = async (req,res,next) => {
         
        const user = await User.findById(req.params.userId)
        res.status(200).json(user)   
   
}