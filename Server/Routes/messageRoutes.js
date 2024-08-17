const express = require('express')
const router = express.Router();
const {addMessages, getAllMessages, getMessages} = require('../Controllers/messagesController')

router.post('/addmessage', addMessages)
router.post('/getmessage',getAllMessages)
router.get('/message',getMessages)
module.exports = router