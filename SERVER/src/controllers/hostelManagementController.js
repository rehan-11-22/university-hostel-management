const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const hostelModel = require("../models/hostelModel");
const floorModel = require("../models/floorModel");
const roomModel = require("../models/roomModel");


// const registerHostel = asyncHandler(async (req, res) => {
//     try {
//         const { name, location, floors } = req.body;

//         let hostel = await hostelModel.findOne({ name });

//         if (!hostel) {
//             hostel = await hostelModel.create({ name, location, floors: [] });
//         }

//         for (const floor of floors) {
//             let floorData = await floorModel.findOne({ floorNumber: floor.number });

//             if (!floorData) {
//                 floorData = await floorModel.create({ floorNumber: floor.number, rooms: [] });
//                 hostel.floors.push(floorData);
//             }

//             for (const room of floor.rooms) {
//                 // console.log(room);
//                 let roomData = await roomModel.findOne({ roomNumber: room?.roomNumber })
//                 if (!roomData) {
//                     roomData = await roomModel.create(room);
//                     floorData.rooms.push(roomData);
//                 } else {
//                     return res.status(401).json({ message: "Room Already exsist" })
//                 }
//             }

//             await floorData.save();
//         }

//         await hostel.save();

//         res.status(201).json({ message: "Hostel Record Added", hostel });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
// // const { name, location } = req.body

// // if (!name, !location) {
// //     throw new ApiError(400, "All fields are required")
// // }
// // const hostelData = {
// //     name, location,
// //     createdBy: {
// //         email: "abc@email.com",
// //         id: "_id--jfslflsdjf"
// //     }
// // }

// // const newHostel = await hostelModel.create(hostelData)
// // if (!newHostel) {
// //     throw new ApiError(401, "Somthing went wron at adding hostel data")
// // }
// // return res.status(200).json({ message: "Hostel data added successfully" })
// // })



// // floor controller
// const registerFloor = asyncHandler(async (req, res) => {
//     try {
//         const { floorNumber, rooms } = req.body
//         if (!floorNumber || !rooms) {
//             throw new ApiError(400, "All fields are required")
//         }
//         // rooms id find
//         const roomData = await roomModel.findOne({ roomNumber: rooms })
//         const room_id = roomData?._id;

//         // return console.log("room_id ==>", room_id);
//         if (!room_id) {
//             throw new ApiError(400, "Rooms data cannot find")
//         }

//         const newFloor = await floorModel.create({ floorNumber, rooms: room_id })
//         if (!newFloor) {
//             throw new ApiError(500, "somthing went wrong at add floor data")
//         }
//         return res.status(200).json({ message: "Floor data is added successfully" })
//     } catch (error) {
//         throw new ApiError(500, "somthing went wrong")
//     }
// })



// // Rooms controller
// const registerRoom = asyncHandler(async (req, res) => {
//     try {
//         const { roomNumber, type, capacity, isAvailable } = req.body
//         if (!roomNumber || !type || !capacity) {
//             throw new ApiError(400, "All fields are required")
//         }

//         const newFloor = await roomModel.create({ roomNumber, type, capacity, isAvailable })
//         if (!newFloor) {
//             throw new ApiError(500, "somthing went wrong at add room data")
//         }
//         return res.status(200).json({ message: "Room data is added successfully" })
//     } catch (error) {
//         throw new ApiError(500, "somthing went wrong")
//     }
// })


// module.exports = {
//     registerHostel,
//     registerFloor,
//     registerRoom,
// }
// const registerHostel = asyncHandler(async (req, res) => {
//     try {
//         const { name, location, floors } = req.body;
//         let hostel = await hostelModel.findOne({ name }).populate('floors');
//         // return console.log(hostel);

//         if (!hostel) {
//             hostel = await hostelModel.create({ name, location, floors: [] });
//         }

//         let errors = [];
//         for (const floor of floors) {
//             let  floorData = await floorModel.findOne({ floorNumber: floor.number }).populate('rooms');

//             if (!floorData) {
//                 floorData = await floorModel.create({ floorNumber: floor.number, rooms: [] });
//                 hostel.floors.push(floorData);
//             }
//             for (const room of floor.rooms) {
//                 console.log("room ", room);
//                 let roomExists = floorData.rooms.some(r => r.roomNumber === Number(room.roomNumber));
//                 if (!roomExists) {
//                     let newRoom = await roomModel.create(room);
//                     await newRoom.save();  // Save each room individually
//                     floorData.rooms.push(newRoom);
//                 } else {
//                     errors.push(`Room ${room.roomNumber} already exists on floor ${floor.number}.`);
//                 }
//             }

//             await floorData.save(); // Save floors after adding rooms
//         }

//         await hostel.save(); // Save hostel after all floors

//         if (errors.length > 0) {
//             return res.status(400).json({ message: "Floor or room number already exist", errors });
//         }

//         res.status(201).json({ message: "Hostel Record Added", hostel });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
const registerHostel = asyncHandler(async (req, res) => {
    try {
        const { name, location, floors } = req.body;
        let hostel = await hostelModel.findOne({ name }).populate({
            path: 'floors',
            populate: {
                path: 'rooms'
            }
        });

        // If the hostel doesn't exist, create a new one
        if (!hostel) {
            hostel = new hostelModel({ name, location, floors: [] });
        }

        let errors = [];
        let roomMsg = [];
        for (const floor of floors) {
            // Check if the floor already exists within the current hostel
            let floorData = await floorModel.findOne({ floorNumber: floor.number, hostel: hostel._id }).populate('rooms');

            // If the floor doesn't exist, create a new one
            if (!floorData) {
                floorData = new floorModel({ floorNumber: floor.number, rooms: [], hostel: hostel._id });
                hostel.floors.push(floorData._id);
            }

            for (const room of floor.rooms) {
                // Check if the room already exists on the current floor
                let roomExists = floorData.rooms.some(r => r.roomNumber === room.roomNumber);
                if (!roomExists) {
                    const newRoom = new roomModel(room);
                    await newRoom.save();  // Save each room individually
                    floorData.rooms.push(newRoom._id);
                    roomMsg.push("Room data added")

                } else {
                    errors.push(`Room ${room.roomNumber} already exists on floor ${floor.number}.`);
                }
            }

            await floorData.save(); // Save floors after adding rooms
        }

        await hostel.save(); // Save hostel after all floors and rooms

        if (roomMsg.length > 0) {
            return res.status(201).json({ message: "Hostel Record Added", hostel });
        }
        else if (errors.length > 0) {
            return res.status(400).json({ message: "Floor or room number already exist", errors });
        }

        // res.status(201).json({ message: "Hostel Record Added", hostel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    registerHostel,
    // registerFloor,
    // registerRoom,
}
