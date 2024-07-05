const express = require('express')
const {  getAllTasks, createTask, DeleteTask, updateTitle, updateDescription, createUser, getAllUsers, forgetPass, getUserByEmail } = require('../controller/usercontroller')

const router=express.Router()

router.get('/gettasks', getAllTasks)
router.post('/createtasks', createTask)
router.delete('/delete',DeleteTask)
router.put('/updatetitle', updateTitle)
router.put('/updatedescription', updateDescription)
router.get('/getuser',getAllUsers)
router.post("/createuser",createUser)
router.put('/forgetpassword', forgetPass)
router.get('/getUserByEmail', getUserByEmail)

module.exports=router;