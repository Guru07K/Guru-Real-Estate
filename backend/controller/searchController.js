const List = require("../model/ListingModel");

exports.search = async (req, res, next) => {
    let searchTerm = req.query.searchTerm || '';
    let offer = req.query.offer === 'true' ? true : { $in: [true, false] }; 
    let furnished = req.query.furnished === 'true' ? true : { $in: [true, false] }; 
    let parking = req.query.parking === 'true' ? true : { $in: [true, false] };
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc'; 
    
    let type = req.query.type && req.query.type !== 'false' && req.query.type !== 'all' 
        ? req.query.type 
        : { $in: ['sale', 'rent'] };  

    try {
        const lists = await List.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type
        }).sort({ [sort]: order === 'asc' ? 1 : -1 })


        const count = lists.length;

        // Return the results
        return res.status(200).json({
            count,
            lists
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred while searching.',
            error: error.message
        });
    }
};
