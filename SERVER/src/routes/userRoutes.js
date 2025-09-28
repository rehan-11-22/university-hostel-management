const express = require('express')
const { registerUser, loginUser, logoutUser, updateUserData, updateUserPassword, forgotUserPassword, deleteUser } = require('../controllers/userContollers')
const router = express.Router()
const { upload } = require("../middlewares/multerMiddleware")
const { verifyJWT } = require('../middlewares/authMiddleware')
const { roleController } = require('../controllers/roleControllers')
const userModels = require('../models/userModels')
const employeeLoginHistoryModel = require('../models/employeeLoginHistoryModel')


// for get request
router.get('/', async (req, res) => {
    try {
        const allEmpData = await userModels.find({ isDeleted: 'false' })
        res.status(200).json({ allEmpData, message: "Employee list" })
    } catch (error) {
        return res.status(500, "Somthing went wrong to get Employee data")
    }
})
router.get('/history', async (req, res) => {
    try {
        const loginHistory = await employeeLoginHistoryModel.find({}).populate('employeeId')
        // console.log("This is employee history data ", employeeLoginHistory);


        res.status(200).json({ loginHistory, message: "Employee Login History" })
    } catch (error) {
        // console.log("history error ",error);
        return res.status(500, "Somthing went wrong to get Employee history data")
    }
})
router.post('/history/delete', async (req, res) => {
    // Extract the array of _id values from the request body
    const idsToDelete = req.body.map(item => item._id);

    await employeeLoginHistoryModel.deleteMany({ _id: { $in: idsToDelete } })
        .then((result) => {
            console.log(`${result.deletedCount} documents deleted successfully`);
            res.status(200).json({ message: `${result.deletedCount} documents deleted successfully` });
        })
        .catch((error) => {
            console.error('Error deleting documents:', error);
            res.status(500).json({ error: 'An error occurred while deleting documents' });
        });

})

// for Register User
router.post('/register', upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    // {
    //     name: "coverImage",
    //     maxCount: 1
    // }
]), registerUser)

// for login user

router.post('/login', loginUser)

// for delete user Data

router.delete('/delete/:id', deleteUser)
// for Update user Data

router.post('/update', updateUserData)

// for Forgot user password

router.post('/forgotpassword', forgotUserPassword)

// for Update user Password

router.put('/update/password', updateUserPassword)

// logOut user
router.post('/logout', verifyJWT, logoutUser)



// Role route
router.post('/addrole', roleController)



module.exports = router