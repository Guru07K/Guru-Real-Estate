const express = require('express');
const multer = require('multer');
const  path = require('path');
const { register, signIn, updateProfile, deleteUser, logOut, deleteCloudinaryPicture, getUserById } = require('../controller/authController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
                destination : function (req, file , cb){
                    cb(null, path.join(__dirname,'..', 'uploads/user'));
                },
                filename : function (req, file, cb){
                    cb(null, file.originalname)
                }
            })
})


router.route('/register').post(upload.single('avatar'),register)
router.route('/signin').post(signIn)
router.route('/delete/:id').delete(isAuthenticated, deleteUser)
router.route('/deletecloud').post(deleteCloudinaryPicture)
router.route('/logout').get(logOut)
router.route('/updateProfile').put(isAuthenticated, updateProfile)
router.route('/getuserbyid/:userId').get(getUserById)



module.exports = router;