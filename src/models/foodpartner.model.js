const mongoose = require("mongoose");

// const foodPartnerSchema = new mongoose.Schema({
//   restaurantName: { type: String, required: true },
//   ownerName: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   businessAddress: { type: String, required: true },
//   city: { type: String, required: true },
//   //businessType: { type: String, required: true },
//   businessEmail: { type: String, required: true, unique: true },
//   password: { type: String, required: true, minlength: 6 },
//   createdAt: { type: Date, default: Date.now }
// });

// const FoodPartner = mongoose.model("FoodPartner", foodPartnerSchema);

// module.exports = FoodPartner;

const foodPartnerSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  businessAddress: { type: String, required: true },
  city: { type: String, required: true },
  businessType: { type: String },
  businessEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const FoodPartner = mongoose.model("FoodPartner", foodPartnerSchema);

module.exports = FoodPartner;

