const foodModel = require('../models/food.model')
const likeModel = require('../models/likes.model')
const saveModel = require('../models/save.model')
const storageService = require('../services/storage.service')
const updateFoodAnalytic = require('../services/updateFoodAnalytics.service')
const { v4: uuid} = require('uuid')

async function createFood(req, res) {
    const fileUploadResult = await storageService.uploadImage(req.file.buffer, uuid())
    
    const foodItem = await foodModel.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: 'food created successfully',
        food: foodItem
    })

    
}

async function deleteFood(req, res) {
    const foodId = req.params.id
    const result = await foodModel.findByIdAndDelete(foodId);

    res.status(200).json({
        message: 'food deleted',
        result
    })
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}


async function likeFood(req, res){
    const {foodId} = req.body;
    const user = req.user;
    if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
}

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if(isAlreadyLiked){
        await likeModel.findOneAndDelete({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } })

        return res.status(200).json({
            message: "Food unliked successfully",
        })
    }



    const like = await likeModel.create({
        user: req.user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })
}

async function saveFoodItem(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSavedFoodItems(req, res) {
      const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });
}

async function foodAnalytics(req, res) {
    const foodId = req.params.id;
    const updated = updateFoodAnalytic(foodId)
}

module.exports = {
    createFood,
    deleteFood,
    getFoodItems,
    likeFood,
    saveFoodItem,
    getSavedFoodItems,
    foodAnalytics
}