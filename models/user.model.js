const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  profilePicture: { type: String }, // Add this field for profile picture URL
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
