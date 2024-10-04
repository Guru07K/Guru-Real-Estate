const express = require('express');
const { createList, deleteuserlist, getListById, updateList, deleteImage, sendEmailToOwner, getUserLists } = require('../controller/listingController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { search } = require('../controller/searchController');
const router = express.Router();

router.route('/createlist').post(isAuthenticated, createList)
router.route('/sendEmail').post(sendEmailToOwner)
router.route('/search').get(search)

router.route('/getuserLists').get(isAuthenticated, getUserLists)
router.route('/getListbyId/:listId').get(isAuthenticated, getListById)
                                    .put(isAuthenticated, updateList)
                                    
router.route('/deleteuserlist/:listId/:imageId').delete(isAuthenticated,deleteImage )
router.route('/deleteuserlist/:listId').delete(isAuthenticated,deleteuserlist)


module.exports = router