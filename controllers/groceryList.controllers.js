const { GroceryList } = require("../models/groceryList.model");
const { Group } = require("../models/group.model");

/**
 * @param {title: { type: String }}
 * @param {owner: { type: mongoose.Types.ObjectId, ref: "User" },}
 * @param { groupId: [{ type: mongoose.Types.ObjectId, ref: "Group" }],}
 * @param {mainList: [{ type: mongoose.Types.ObjectId, ref: "Product" }],}
 * @param { eachParticipantList: { type: Array },}
 * @param {  date: { type: Date, default: Date.now },}
 * @param {  isActive: { type: Boolean },}
 */

//^ get all
const getAllGroceryLists = async (req, res) => {
  try {
    const groceryList = await GroceryList.find({})
      .populate("groupId")
      .populate("owner");
    return res.send(groceryList);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

//^ get group grocecy lists
const getGroupGroceryLists = async (req, res) => {
  const { id } = req.params;
  try {
    const groceryLists = await GroceryList.find({
      groupId: id,
      isActive: true,
    });
    console.log(groceryLists);
    if (groceryLists) return res.send(groceryLists);
    return res.status(404).send("couldn't find the groceryLists");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

//^ get single groceryList
const getOneGroceryList = async (req, res) => {
  const { id } = req.params;
  try {
    const groceryList = await GroceryList.findById(id)
      .populate({
        path: "mainList",
        populate: {
          path: "productId",
          select: "title img category",
        },
      })
      .populate("groupId")
      .populate("owner");
    if (groceryList) return res.send(groceryList);
    return res.send("couldn't find the groceryList");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

/**
 * @param {title: { type: String }}
 * @param {owner: { type: mongoose.Types.ObjectId, ref: "User" },}
 * @param { groupId: { type: mongoose.Types.ObjectId, ref: "Group" },}
 * @param {mainList: [{ type: mongoose.Types.ObjectId, ref: "Product" }],}
 * @param { eachParticipantList: { type: Array },}
 * @param {  date: { type: Date, default: Date.now },}
 * @param {  isActive: { type: Boolean },}
 */

//^ create
const createGroceryList = async (req, res) => {
  const { body } = req;
  try {
    console.log(body);
    const group = await Group.findById(body.groupId);
    console.log(group);
    // body.owner = group.owner;
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
  try {
    const newgroceryList = new GroceryList(body);
    await newgroceryList.save();
    return res.send(newgroceryList);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
};
//^ update
const updateGroceryList = (req, res) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const groceryList = GroceryList.findByIdAndUpdate(id, body, { new: true });
    if (groceryList) return res.send(groceryList);
    return res.send("groceryList wasn't found");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ editMainList
const updateMainList = async (req, res) => {
  try {
    const { groceryListId, productId, action } = req.body;

    // Find the grocery list by ID
    const groceryList = await GroceryList.findById(groceryListId);

    if (!groceryList) {
      return res.status(404).send("Grocery list not found");
    }

    // Find the index of the product in the mainList array
    const index = groceryList.mainList.findIndex(
      (item) => item.productId.toString() === productId
    );

    // If the product is not found in the list, add it with amount 1
    if (index === -1) {
      groceryList.mainList.push({ productId, amount: 1 });
    } else {
      // Perform the add or subtract action based on the request
      if (action === "add") {
        groceryList.mainList[index].amount += 1;
      } else if (action === "remove") {
        groceryList.mainList[index].amount -= 1;

        // If the amount is 0, remove the product from the list
        if (groceryList.mainList[index].amount === 0) {
          groceryList.mainList.splice(index, 1);
        }
      } else {
        return res.status(400).send("Invalid action");
      }
    }

    // Save the updated grocery list
    await groceryList.save();

    res.send("MainList updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

//^delete
const deleteGroceryList = async (req, res) => {
  const { id } = req.params;
  try {
    const delgroceryList = await GroceryList.findByIdAndDelete(id);
    console.log(delgroceryList);
    res.send("deleted successfully");
  } catch (error) {
    res.status(400).send("Error");
  }
};
module.exports = {
  getAllGroceryLists,
  getOneGroceryList,
  createGroceryList,
  updateGroceryList,
  deleteGroceryList,
  getGroupGroceryLists,
  updateMainList,
};
