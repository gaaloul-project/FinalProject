const mongoose = require("mongoose");


const RoomSchema = new mongoose.Schema({
    type: {
        type: String,
      },
      beds: {
        type: Number,
      },
      price: {
        type: Number,
      },
      guests: {
        type: Number,
      },
      cancellation: {
        type: Boolean,
      },
      location: {
        type: String,
      },
      availableFrom: {
        type: Date,
      },
      availableTill: {
        type: Date,
      },
      description: {
        type: String,
      },
      imageData: {
        type: Object,
      },
      host: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    CostByNight:{type:String},

});
module.exports = mongoose.model("Room", RoomSchema);