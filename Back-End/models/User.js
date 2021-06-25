
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    Role:{type:String},
    FirstName: { type: String, required: true },
    LastName:{type:String},
    Email:{type:String},
    PassWord:{type:String},
    Photo:{type:String},
    Birthday:{type:String},
    PhoneNumber:{type:String},
    Gender:{type: String,
        enum : ['male','female'],
        default: 'male'},
    AccountStatues:{type: String,
        enum : ['active','inactive'],
        default: 'active'},
    created_at : {type:Date, 
                  default: Date.now,}

});
module.exports = mongoose.model("User", userSchema);