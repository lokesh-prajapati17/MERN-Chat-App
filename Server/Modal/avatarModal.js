const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: String,
  originalname: String,

  imageData: {
    data: Buffer,
    contentType: String,
  },
  size: String,
  path: String,
   _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  // username:String
});

const avatarModal = mongoose.model("avatars", imageSchema);

module.exports = avatarModal;
