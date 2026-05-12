import { razorpay } from '../config/razorpay.js'
import crypto from 'crypto'
import { Order } from '../models/order.js'

export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount, orderId } = req.body

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    }

    const order = await razorpay.orders.create(options)

    await Order.findByIdAndUpdate(orderId, {
      razorpay_order_id: order.id
    })

    res.status(200).json({
      success: true,
      data: order
    })
  } catch (error) {
    next(error)
  }
}

export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment parameters'
      })
    }

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (generatedSignature === razorpay_signature) {
      const order = await Order.findById(orderId)

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        })
      }

      if (order.paymentStatus === 'paid') {
        return res.status(200).json({
          success: true,
          message: 'Payment already verified',
          data: order
        })
      }

      order.paymentStatus = 'paid'
      order.razorpay_order_id = razorpay_order_id
      order.razorpay_payment_id = razorpay_payment_id
      order.razorpay_signature = razorpay_signature
      order.orderStatus = 'processing'
      await order.save()

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: order
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      })
    }
  } catch (error) {
    next(error)
  }
}

export const razorpayWebhook = async (req, res, next) => {
  try {
    console.log('Webhook hit...')
    const razorpaySignature = req.headers['x-razorpay-signature']
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    const generatedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(req.body)
      .digest('hex')

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid webhook signature'
      })
    }

    const body = JSON.parse(req.body.toString())

    const event = body.event
    const payload = body.payload
    console.log('webhook event:', body.event)

    if (event === 'payment.captured') {
      const payment = payload.payment.entity
      const order = await Order.findOne({
        razorpay_order_id: payment.order_id
      })

      console.log('Searching Order ID:', payment.order_id)
      console.log('found Order:', order)

      if (order) {
        ;(order.paymentStatus = 'paid'),
          (order.orderStatus = 'processing'),
          (order.razorpay_payment_id = payment.id)

        await order.save()
        console.log('Order updated via webhook')
      }
    }

    if (event === 'payment.failed') {
      const payment = payload.payment.entity

      const order = await Order.findOne({
        razorpay_order_id: payment.order_id
      })

      if (order) {
        (order.paymentStatus = 'failed'), await order.save()
        console.log('Order marked failed')
      }
    }
    res.status(200).json({
      success: true
    })
  } catch (error) {
    next(error)
  }
}
