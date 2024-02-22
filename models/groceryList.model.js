const mongoose = require("mongoose");

const groceryListSchema = new mongoose.Schema({
  title: { type: String },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  groupId: { type: mongoose.Types.ObjectId, ref: "Group" },
  mainList: [
    {
      productId: { type: mongoose.Types.ObjectId, ref: "Product" },
      amount: { type: Number, default: 1 },
    },
  ],
  eachParticipantList: { type: Array },
  date: { enDate: { type: Date }, heDate: { type: String } },
  isActive: { type: Boolean, default: true },
});

const GroceryList = mongoose.model("GroceryList", groceryListSchema);

module.exports = { GroceryList };
