const FoodModel = require('../models/food.model')

const updateFoodAnalyticsOnOrder = async (_id, orderAmount) => {
    // console.log(foodId)
    // console.log(orderAmount)
    // console.log(foodPartner)
  try {
    // Find the restaurant analytics by restaurant ID
    const analytics = await FoodModel.findOne({ _id });

    if (analytics) {
      // Update sales and orders
      analytics.analytics.totalSales += orderAmount;
      analytics.analytics.totalOrders += 1;
      await analytics.save();
    }
    // } else {
    //   // Create a new entry if none exists for the restaurant
    //   const newAnalytics = new FoodModel({
    //     restaurantId,
    //     totalSales: orderAmount,
    //     totalOrders: 1,
    //   });
    //   await newAnalytics.save();
    // }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};

module.exports = updateFoodAnalyticsOnOrder