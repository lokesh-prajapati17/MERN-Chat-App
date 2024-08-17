const avatarModal = require("../Modal/avatarModal");
const fs = require("fs");
const path = require("path");

const Avatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log(__dirname, "../uploads/", req.file.filename);
    const saveImage = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      imageData: {
        data: fs.readFileSync(
          path.join(__dirname, "../uploads/", req.file.filename)
        ),
        contentType: req.file.mimetype,
      },
      _id: req.body._id,
      // username: req.body.username,
    };

    const image = new avatarModal(saveImage);
    await image.save();
    res.status(200).json({ message: "Image stored successfully", image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAvatar = async (req, res) => {
  try {
    const avatars = await avatarModal.find({});
    res.status(200).json(avatars);
  } catch (error) {
    console.error("Error getting avatars:", error);
    res.status(500).json({ message: error.message });
  }
};

const getSingleAvatar = async (req, res, next) => {
  try {
    const uniqueID = req.params.id;
    const userProfile = await avatarModal.findById(uniqueID);
    res.status(200).json(userProfile);
  } catch (error) {
   next(error)
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const data = req.body;
    const options = { new: true };
    const newData = await avatarModal.findOneAndUpdate({ _id: _id }, data, options);
    res.status(200).json(newData);
  } catch (error) {
    console.log("error to update profile", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { Avatar, getAvatar, getSingleAvatar, updateAvatar };
