const userModel = require("../models/user.models");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if (isUserAlreadyExists) {
    return res.status(400).json({
        message: "User already exists"
    });
}


    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })

}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user) {
        res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,    
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        _id: user._id,
        email: user.email,
        fullName: user.fullName
    })
}

async function logoutUser(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    })
}


// FOOD PARTNER AUTH CONTYROLLER

async function registerFoodPartner(req,res) {
const {
  restaurantName,
  ownerName,
  phoneNumber,
  businessAddress,
  city,
  businessEmail,
  password
} = req.body;

     const isAccountAlreadyExists = await foodPartnerModel.findOne({
        businessEmail
     });

     if(isAccountAlreadyExists){
        return res.status(400).json({
            message: "Food partner account already exists"
        });
     }

     const hashedPassword = await bcrypt.hash(password, 10);

     const foodPartner = await foodPartnerModel.create({
       restaurantName,
       ownerName,
       phoneNumber,
       businessAddress,
       city,
       businessEmail,
       password: hashedPassword
});

     const token = jwt.sign({
        id: foodPartner._id,
     }, process.env.JWT_SECRET)

     res.cookie("token", token)


    res.status(201).json({
    message: "Food partner registered successfully",
    foodPartner: {
    _id: foodPartner._id,
    foodItems: allFoods, 
    restaurantName: foodPartner.restaurantName,
    ownerName: foodPartner.ownerName,
    phoneNumber: foodPartner.phoneNumber,
    businessAddress: foodPartner.businessAddress,
    city: foodPartner.city,
    businessEmail: foodPartner.businessEmail,
    role: foodPartner.role
  }
});

 res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })


}



//LOGIN
// async function loginFoodPartner(req,res){
//     const { email,password } = req.body;
    
//     const foodPartner = await foodPartnerModel.findOne({
//         email
//     });

//     if(!foodPartner) {
//         return res.status(400).json({
//             message: "Invalid email or password"
//         })
//     }

//     const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

//     if(!isPasswordValid){
//         return res.status(400).json({
//             message: "Invalid email or password"
//         })
//     }

//     const token = jwt.sign({
//         id: foodPartner._id,
//     }, process.env.JWT_SECRET)

//     res.cookie("token", token)

//     res.status(200).json({
//         message: "Food partner logged in successfully",
//         foodPartner:{
//             _id: foodPartner._id,
//             email: foodPartner.email,
//             name: foodPartner.name
//         }
//     })
// }

async function loginFoodPartner(req, res) {
  const { businessEmail, password } = req.body;

  if (!businessEmail || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foodPartner = await foodPartnerModel.findOne({ businessEmail });

  if (!foodPartner) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);

  res.cookie("token", token, { httpOnly: true });

  res.status(200).json({
    message: "Food partner logged in successfully",
    foodPartner: {
      _id: foodPartner._id,
      businessEmail: foodPartner.businessEmail,
      name: foodPartner.name
    }
  });
}


function logoutPartner(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutPartner
}

