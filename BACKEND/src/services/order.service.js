const orderModel = require('../models/order.model')
const foodModel = require('../models/food.model')
const mongoose = require('mongoose')

// 1. Create Order with price calculation
const newOrder = async(data)=>{
    const { items } = data;

    const enrichedItems = [];
    let total = 0;

    for (const item of items) {
        const { foodId, quantity } = item;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(foodId)) {
        throw new Error(`Invalid foodId: ${foodId}`);
        }

        // Fetch food details
        const food = await foodModel.findById(foodId);
        if (!food) {
        throw new Error(`Food not found: ${foodId}`);
        }

        // Calculate subtotal for this item
        const subtotal = food.price * quantity;

        // Add to total
        total += subtotal;

        if(food){
            food.analytics.totalSales += subtotal;
            food.analytics.totalOrders += quantity;
            await food.save();
        }

        // Push enriched item
        enrichedItems.push({
            foodId: food._id,
            quantity,
            price: food.price,
            subtotal
        });
    }
    
    // Create order with calculated total
    const newOrder = await orderModel.create({
        items: enrichedItems,
        total,
        status: 'pending' 
    });
    return newOrder

}

// 2. Update Order Status
async function updateOrderStatus(orderId, newStatus) {
  const allowedStatuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];

  if (!allowedStatuses.includes(newStatus)) {
    throw new Error(`Invalid order status: ${newStatus}`);
  }

  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { status: newStatus },
    { new: true }
  );

  if (!order) {
    throw new Error('Order not found');
  }

  return order;
}

// 3. Get order by ID (optional helper)
async function getOrderById(orderId) {
  const order = await orderModel.findById(orderId).populate('items.foodId');
  if (!order) throw new Error('Order not found');
  return order;
}

module.exports = {
    newOrder,
    updateOrderStatus,
    getOrderById
}