const List = require("../model/ListingModel")
const ErrorHandler = require("../utils/error");
const sendEmail = require("../utils/sendEmail");


// CREATE list ---- /api/listing/createlist
exports.createList = async (req, res, next) => {
    try {
        const list = await List.create(req.body)
        res.status(201).json({
            message: "List created successfully",
            list
        })
    } catch (error) {
        next(error)
    }
}                 

// Get list by user   ---- /api/listing/getuserLists
exports.getUserLists = async (req, res, next) => {

        const lists = await List.find({user : req.user})

        if(!lists) {
            return next(new ErrorHandler('List not added yet', 404))
        }

        res.status(200).json({
            messages: "List Fetched successfully",
            success: true,
            lists 
        })
    
}

// Delete User list ----- /api/listing/deleteuserlist/${listId}
exports.deleteuserlist = async (req, res, next) => {

    await List.findByIdAndDelete(req.params.listId)
    
    
    res.status(200).json({
        message: "List deleted successfully",
        success: true,
    })
}


// Get list  by Id  ------- /api/listing/getListbyId/${listId}
exports.getListById = async (req, res, next) => {
    const list = await List.findById(req.params.listId)
    
    if(!list) {
        return next(new ErrorHandler('List not found', 404))
    }
    res.status(200).json(list)
}

// Update list  ------- /api/listing/getListbyId/${listId}
exports.updateList = async (req, res, next) => {
    const updatedList = await List.findByIdAndUpdate(req.params.listId, 
        req.body, 
        {new: true}
    )
    
    if(!updatedList) {
        return next(new ErrorHandler('List not found', 404))
    }
    res.status(200).json(updatedList)
}

// Delete images on list by image id
 exports.deleteImage = async (req, res) => {
    await List.findByIdAndUpdate(req.params.listId,
        { $pull: { images: { _id: req.params.imageId } } },
        {new: true}
    )
    const list = await List.findById(req.params.listId)
    res.status(200).json({
        message: "Image deleted successfully",
        success: true,
        list
    })
} 

// Send email to owner /api/listing/sendEmail
exports.sendEmailToOwner = async (req,res,next) => {
    sendEmail({
        email : req.body.email,
        message : req.body.message,
        subject : req.body.subject

    })
    res.status(200).json({
        message: "Email sent successfully",
        success: true,
    })
}
