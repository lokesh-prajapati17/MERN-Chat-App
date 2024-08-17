const userModal = require("../Modal/userModal");
module.exports.getAllContact = async (req, res, next) => {
  try {
    const contacts = await userModal
      .find({ _id: { $ne: req.params.id } })
      .select(["email", "username", "_id"]);
    res.status(200).json(contacts);
  } catch (error) {
    console.log("error to get conacts", error);
    res.status(500).json({
      message: error,
    });
  }
};

module.exports.findContact = async (req, res, next) => {
  try {
    const searchQuery = req.query.username; 
    const data = await userModal.find({ username: { '$regex': searchQuery } });
    res.status(200).json(data); 
  } catch (error) {
    console.log("Error searching for contacts:", error);
    res.status(500).json({ message: error.message });
  }
};

