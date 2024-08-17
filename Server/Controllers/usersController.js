const userModal = require("../Modal/userModal");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userName = await userModal.findOne({ username });
    if (userName) {
      return res.status(400).send({ message: "usename is already present" });
    }
    const Email = await userModal.findOne({ email });
    if (Email) {
      return res.status(400).send({ message: "email is already used" });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const userData = await userModal.create({
      username,
      email,
      password: hashedPass,
    });

    // delete userData.password;
    res.status(201).json({message:"successfully created",userData});
  } catch (error) {
    console.log("error to create user");
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModal.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: "Username not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Server error" });
  }
};


module.exports.updateProfile = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const newData = req.body;
    const updatedData = await userModal.findByIdAndUpdate(_id, newData, { new: true });

    if (!updatedData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    console.log('Error updating:', error);
    res.status(500).json({ message: error.message });
  }
};
