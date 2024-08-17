const express = require("express");
const router = express.Router();
const {register, login,updateProfile} = require("../Controllers/usersController");
router.post("/register", register);
router.post('/login', login)
router.patch('/update/:_id',updateProfile)
module.exports = router;
