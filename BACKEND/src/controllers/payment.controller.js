const foodModel = require('../models/food.model');
const orderModel = require('../models/order.model');
const paymentModel = require('../models/payment.model')

// 
require('dotenv').config();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// 

async function createPayment(req, res) {
    try{
        const orderId = req.params.orderId
        const findOrder = await orderModel.findById(orderId)
        const options = {
            amount: findOrder.total, // amount in smallest currency unit
            currency: "INR",
        };
    
        const order = await razorpay.orders.create(options);
        const payment = await paymentModel.create({
            order: orderId,
            razorpayOrderId: order.id,
            user: req.user.id,
            price:{
                amount: order.amount,
                currency: order.currency
            }
        })

        return res.status(201).json({
            message: 'Payment initiate',
            payment
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

async function verifyPayment(req, res) {
    const { razorpayOrderId, paymentId, signature} = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    try{
        const { validatePaymentVerification } = require('../../node_modules/razorpay/dist/utils/razorpay-utils.js');
        const isValid = validatePaymentVerification({
            order_id: razorpayOrderId,
            payment_id: paymentId,
        },signature, secret)

        if(!isValid){
            return res.status(400).json({
                message: "Invalid signature"
            })
        }

        const payment = await paymentModel.findOne({ razorpayOrderId, status: 'PENDING'})

        if(!payment){
            return res.status(404).json({ message: 'Payment not found'})
        }

        payment.paymenId = paymentId;
        payment.signature = signature;
        payment.status = 'COMPLETED'

        await payment.save();

        res.status(200).json({
            message: 'Payment verified successfully', 
            payment
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports ={
    createPayment,
    verifyPayment
}