
const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    
    BookingStartDate:{type:Date},
    BookingSEndDate:{type:Date},
    BookingStatues:{type: String,
        enum : ['open','canceled'],},
    FinalCoast:{type:Number},
    TimeStamp:{type:Date},
    Customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer",
      },
    House: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "House",
      },
  


});
module.exports = mongoose.model("Booking", bookingSchema);