const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, require: true },
  img: { type: String },
  price: { type: String },
  category: { type: String },
  weight:{type:String}
});

productSchema.index({ title: 'text' });
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
