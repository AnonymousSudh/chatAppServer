const express = require('express')
const router = express.Router();

const UserController = require("../../controller/UserController")
const MessageController = require("../../controller/messageController")


router.post('/createUser', UserController.createUser)
router.post('/searchUser', UserController.searchUser)
router.post('/loginUser', UserController.loginUser)
router.get('/previousMessages', MessageController.getPrevMessage)



module.exports = router