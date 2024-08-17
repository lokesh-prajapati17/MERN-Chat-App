const express = require("express");
const { Avatar, getAvatar, getSingleAvatar, updateAvatar } = require("../Controllers/avatarController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/upload", upload.single("image"), Avatar);
router.get('/avatars', getAvatar);
router.get('/avatars/:id', getSingleAvatar);
router.patch('/avatar/:_id', updateAvatar)
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = router;
