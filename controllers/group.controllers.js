const { GroceryList } = require("../models/groceryList.model");
const { Group } = require("../models/group.model");

/**
 * @param {title: { type: String }}
 * @param {owner: { type: mongoose.Types.ObjectId, ref: "User" },}
 * @param {participants: [{ type: mongoose.Types.ObjectId, ref: "User" }]}
 * @param {historyGroceryLists: [{ type: mongoose.Types.ObjectId, ref: "GroceryList" }]}
 */

//^ get all
const getAllGroups = async (req, res) => {
  try {
    const group = await Group.find({}).populate("owner", "email fullName");
    return res.send(group);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ get all the groups that the user created
const getAllUserCreatedGroups = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.find({ owner: id })
      .populate("owner", "email fullName")
      .populate("participants", "fullName");
    return res.send(group);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ get all the groups that the user is apart of

const getUserParticiptedGroups = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.find({ participants: id })
      .populate("owner", "email fullName")
      .populate("participants", "fullName");
    return res.send(group);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ get single group
const getOneGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id).populate("owner");
    if (group) return res.send(group);
    return res.send("couldn't find the group");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ get group history list

/**
 * @param {title: { type: String }}
 * @param {owner: { type: mongoose.Types.ObjectId, ref: "User" },}
 * @param {participants: [{ type: mongoose.Types.ObjectId, ref: "User" }]}
 * @param {historyGroceryLists: [{ type: mongoose.Types.ObjectId, ref: "GroceryList" }]}
 */

//^ check if user is in group
const isUserInGroup = async (req, res) => {
  const { body, params } = req;
  const {groupId} = params;
  try {
    const group = await Group.findById(groupId);

    if(!group) return res.status(404).send("Group not found")
    const index = group.participants.indexOf(body.userId);

    if (index === -1) return res.status(401).send("Unauthorized");

    return res.status(200).send("authorized");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ create
const createGroup = async (req, res) => {
  const { body } = req;
  try {
    body.owner = req.user.id;
    body.participants = [body.owner];
    const newGroup = new Group(body);
    await newGroup.save();
    return res.send(newGroup);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
// ////^ moveListToHistory
// const moveListToHistory = async (req, res) => {
//   const { body, params } = req;
//   const { id } = params;
//   try {
//     const group = await Group.findById(id);
//     const list = await GroceryList.findById(body.groupListId);
//     if (!list) return res.send("list wasn't found");
//     const listIndex = group.historyGroceryLists.findIndex((histList) =>
//       histList.equals(list._id)
//     );
//     if (listIndex != -1) return res.status(400).send("list already in history");
//     //Todo add a maxium of 20.
//     if (group.historyGroceryLists.length >= 20) {
//       const removedList = group.historyGroceryLists.pop();
//       //Todo delete the removed list
//       group.historyGroceryLists.unshift(list._id);
//       list.isActive = false;
//       await group.save();
//       await list.save();
//       return res.send(
//         "added to history and removed the last list becuase you reach the maximum capacity of 20 lists"
//       );
//     } else {
//       group.historyGroceryLists.unshift(list._id);
//       list.isActive = false;
//       await group.save();
//       await list.save();
//       return res.send("added to history");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Error");
//   }
// };
//^ moveListToHistory
const moveListToHistory = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const list = await GroceryList.findById(body.groupListId);
    if (!list) return res.send("list wasn't found");

    list.isActive = false;

    await list.save();
    return res.send("List added to history");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ update
const updateGroup = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  // body.participants.push()
  try {
    const group = await Group.findByIdAndUpdate(id, body, { new: true });
    if (group) return res.send(group);
    return res.send("group wasn't found");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ join group
const joinGroup = async (req, res) => {
  const { body } = req;
  try {
    await Group.updateOne(
      { _id: req.group.id },
      { $addToSet: { participants: body.userId } }
    );
    res.send("updated");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^delete
const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const delGroup = await Group.findByIdAndDelete(id);
    res.send("deleted successfully");
  } catch (error) {
    res.status(400).send("Error");
  }
};
module.exports = {
  getAllGroups,
  getOneGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  getAllUserCreatedGroups,
  getUserParticiptedGroups,
  joinGroup,
  moveListToHistory,
  isUserInGroup
};
