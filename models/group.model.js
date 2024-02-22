const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  title: { type: String, require: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  purpose:{type:String, default: "undefined"},
  historyGroceryLists: [{ type: mongoose.Types.ObjectId, ref: "GroceryList" }],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = { Group };
