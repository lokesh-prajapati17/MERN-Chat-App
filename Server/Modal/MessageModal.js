const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModal",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("messages", messagesSchema);
