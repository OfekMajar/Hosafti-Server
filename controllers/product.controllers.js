const { Product } = require("../models/product.model");

//^ get All Products
const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

//^ get by auto comp
const getWithAutoComp = async (req, res) => {
  try {
    let results;
    if (req.query.title) {
      const searchTerm = req.query.title.replace(
        /[-\/\\^$*+?.()|[\]{}]/g,
        "\\$&"
      );
      const regex = new RegExp(searchTerm, "i"); // 'i' for case-insensitive
      results = await Product.aggregate([
        {
          $match: {
            title: { $regex: regex },
          },
        },
        {
          $project: {
            title: 1,
            img: 1,
            category: 1,
            _id: 1,
          },
        },
        {
          $limit: 20,
        },
      ]);
    } else {
      results = await Product.find(
        {},
        { title: 1, img: 1, category: 1, _id: 0 }
      ).limit(10);
    }

    return res.send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

//^ get single product
const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("userId");
    if (product) return res.send(product);
    return res.send("couldn't find the product");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ get category
const getCategory = async (req, res) => {
  const { body, params } = req;
  const { category } = params;

  try {
    const categoryList = await Product.find({ category });
    if (categoryList) {
      res.send(categoryList);
    } else return res.status(401).send("Error");
  } catch (error) {
    console.log(error);
    res.status(401).send("Error");
  }
};
//^ create
const createProduct = async (req, res) => {
  const { body } = req;
  try {
    const newproduct = new Product(body);
    newproduct.id = newproduct._id;
    await newproduct.save();
    return res.send(newproduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
//^ update
const updateProduct = (req, res) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const product = Product.findByIdAndUpdate(id, body, { new: true });
    if (product) return res.send(product);
    return res.send("product wasn't found");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

//^delete
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const delproduct = await Product.findByIdAndDelete(id);
    res.send("deleted successfully");
  } catch (error) {
    res.status(400).send("Error");
  }
};
//^ delete category
const deleteCategory = async (req, res) => {
  const { body, params } = req;
  const { category } = params;

  try {
    const deleteResult = await Product.deleteMany({ category });
    if (deleteResult.deletedCount > 0) {
      res.send(
        `Deleted ${deleteResult.deletedCount} products with category ${category}`
      );
    } else {
      res.send(`No products found with category ${category}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting products");
  }
};
module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategory,
  deleteCategory,
  getWithAutoComp,
};
