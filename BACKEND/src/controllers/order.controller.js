const orderService = require('../services/order.service')

async function createOrder(req, res) {
    try {
        const data = req.body
        const newOrder = await orderService.newOrder(data)
        res.status(201).json(newOrder)
    } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateOrder(req, res) {
  try {
    const updated = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

async function getOrderbyId(req, res) {
    const getOrder = await orderService.getOrderById(req.params.id)
}

module.exports = {
    createOrder,
    updateOrder,
    getOrderbyId
}