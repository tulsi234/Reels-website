const mongoose = require('mongoose');
const FoodPartner = require('./foodpartner.model');

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    video:{
        type: String,
        required:true,
    },
    FoodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "food-partner"
    }
})

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;