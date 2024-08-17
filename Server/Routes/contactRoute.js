const express = require("express");
const router = express.Router();
const { getAllContact,findContact } = require("../Controllers/contactController");

router.get("/allContact/:id", getAllContact); 
router.get('/allContact',findContact)
module.exports = router;
