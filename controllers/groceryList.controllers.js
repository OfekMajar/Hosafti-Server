const { GroceryList } = require("../models/groceryList.model");
const { Group } = require("../models/group.model");
const findUser = require("../utils/findUser");

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

//^ get group active grocecy lists
const getGroupGroceryLists = async (req, res) => {
  const { id } = req.params;
  try {
    const groceryLists = await GroceryList.find({
      groupId: id,
      isActive: true,
    });
    if (groceryLists) return res.send(groceryLists);
    return res.status(404).send("couldn't find the groceryLists");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

//^ get group grocery lists
const getGroupHistoryList = async (req, res) => {
  const { id } = req.params;
  try {
    const groceryLists = await GroceryList.find({
      groupId: id,
      isActive: false,
    })
      .sort({ _id: -1 }) // Sort by descending _id (assuming _id represents the creation timestamp)
      .limit(20); // Limit to 20 results
    if (groceryLists) return res.send(groceryLists);
    return res.status(404).send("Couldn't find the grocery lists");
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
        path: "mainList.productId",
        select: "title img category",
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

//^ create
const createGroceryList = async (req, res) => {
  const { body } = req;
  try {
    const group = await Group.findById(body.groupId);
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
const updateGroceryList = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  try {
    const groceryList = await GroceryList.findByIdAndUpdate(id, body, {
      new: true,
    });
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
    const user = await findUser(req);
    // Find the grocery list by ID
    const groceryList = await GroceryList.findById(groceryListId);

    if (!groceryList) {
      return res.status(404).send("Grocery list not found");
    }
    const group = await Group.findById(groceryList.groupId);
    if (!group.participants.includes(user.id))
      return res.status(401).send("not in group");

    // Find the index of the product in the mainList array
    const index = groceryList.mainList.findIndex(
      (item) => item.productId == productId
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

//^ checkOff list items
const checkOffListItem = async (req, res) => {
  try {
    const { groceryListId, productId } = req.body;
    const groceryList = await GroceryList.findById(groceryListId);
    if (!groceryList) {
      return res.status(404).send("Grocery list not found");
    }
    const index = groceryList.mainList.findIndex(
      (item) => item.productId == productId
    );
    if (index === -1) {
      return res.status(404).send("product not found");
    }
    groceryList.mainList[index].checked = !groceryList.mainList[index].checked;
    await groceryList.save();
    return res.status(200).send("checkd the product");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^delete
const deleteGroceryList = async (req, res) => {
  const { id } = req.params;
  try {
    const delgroceryList = await GroceryList.findByIdAndDelete(id);
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
  getGroupHistoryList,
  checkOffListItem,
};
