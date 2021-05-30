const mongoose = require("mongoose");

const fruitsSchema = mongoose.Schema({
  fruitsName: "",
  daysSinceIAte: "",
});

const Fruits = mongoose.model("Fruits", fruitsSchema);

module.exports = Fruits;