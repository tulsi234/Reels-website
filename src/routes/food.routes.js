 const express = require('express');
 const foodController = require("../controller/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
 const multer = require('multer');

const uploade = multer({
    storage: multer.memoryStorage(),
})

// POST /api/food/[proteted]

router.post('/', authMiddleware.authFoodPartnerMiddleware, 
    uploade.single("mama"),
    foodController.createFood)

    /* GET /api/food/ [protected]*/
    router.get("/", authMiddleware.authFoodPartnerMiddleware,
        foodController.getFoodItems)


module.exports = router

