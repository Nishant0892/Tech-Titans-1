// Models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
  imageUrl: { type: String, required: true }, // New field for image URL
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
