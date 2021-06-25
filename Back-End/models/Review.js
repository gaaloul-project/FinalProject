
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    ReviewComment: { type: String},
    ReviewDate:{type:Date},
   

});
module.exports = mongoose.model("Review", reviewSchema);