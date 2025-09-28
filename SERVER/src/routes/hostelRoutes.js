const express = require('express');
const { registerHostel, registerFloor, registerRoom } = require('../controllers/hostelManagementController');
const hostelModel = require('../models/hostelModel');
const router = express.Router()


// for get request
router.get('/', async (req, res) => {
    try {
        const hostelData = await hostelModel.find({}).populate({
            path: "floors", model: "Floor",
            populate: {
                path: "rooms",
                model: "Room"
            }
        })

        // Calcultion of hostels data
        hostelModel.aggregate([
            {
                $facet: {
                    totalHostels: [{ $count: "count" }],
                    totalRooms: [
                        {
                            $lookup: {
                                from: "floors",
                                localField: "floors",
                                foreignField: "_id",
                                as: "floorsData"
                            }
                        },
                        { $unwind: "$floorsData" },
                        {
                            $lookup: {
                                from: "rooms",
                                localField: "floorsData.rooms",
                                foreignField: "_id",
                                as: "roomsData"
                            }
                        },
                        { $unwind: "$roomsData" },
                        { $group: { _id: null, count: { $sum: 1 } } }
                    ],
                    availableRooms: [
                        {
                            $lookup: {
                                from: "floors",
                                localField: "floors",
                                foreignField: "_id",
                                as: "floorsData"
                            }
                        },
                        { $unwind: "$floorsData" },
                        {
                            $lookup: {
                                from: "rooms",
                                localField: "floorsData.rooms",
                                foreignField: "_id",
                                as: "roomsData"
                            }
                        },
                        { $unwind: "$roomsData" },
                        { $match: { "roomsData.isAvailable": true } },
                        { $group: { _id: null, count: { $sum: 1 } } }
                    ]
                }
            }
        ]).then(results => {
            const totalHostels = results[0].totalHostels[0]?.count || 0;
            const totalRooms = results[0].totalRooms[0]?.count || 0;
            const availableRooms = results[0].availableRooms[0]?.count || 0;

            // console.log(`Total Hostels: ${totalHostels}`);
            // console.log(`Total Rooms: ${totalRooms}`);
            // console.log(`Available Rooms: ${availableRooms}`);
            return res.status(200).json({ hostelData, totalHostels, totalRooms, availableRooms, message: "welcome to hostel route" })
        }).catch(err => {
            console.error("Aggregation error", err);
        })
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.get('/hostelData', async (req, res) => {
    try {
        const hostelData = await hostelModel.find({})
        return res.status(200).json({ hostelData, message: "welcome to hostel route" })
    } catch (error) {
        return res.status(500).send(error);
    }
})

// adding hostel data
router.post("/register", registerHostel)



// floor routes
// router.post("/floor/register", registerFloor)


// Rooms routes
// router.post("/rooms/register", registerRoom)


module.exports = router