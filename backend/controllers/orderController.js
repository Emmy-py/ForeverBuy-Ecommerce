import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const currency = 'usd'
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// POST /api/order/place  (COD)
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        if (!items || !amount || !address) {
            return res.status(400).json({ success: false, message: 'Items, amount, and address are required.' })
        }

        const order = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        })

        await order.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.status(201).json({ success: true, message: 'Order placed successfully.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to place order. Please try again.' })
    }
}

// POST /api/order/stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        if (!items || !amount || !address) {
            return res.status(400).json({ success: false, message: 'Items, amount, and address are required.' })
        }

        const order = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),
        })
        await order.save()

        const lineItems = items.map(item => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))

        lineItems.push({
            price_data: {
                currency,
                product_data: { name: 'Delivery Charge' },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
            line_items: lineItems,
            mode: 'payment',
        })

        res.status(201).json({ success: true, session_url: session.url })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to initiate Stripe payment. Please try again.' })
    }
}

// POST /api/order/verifyStripe
const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body

        if (!orderId || success === undefined) {
            return res.status(400).json({ success: false, message: 'Order ID and payment status are required.' })
        }

        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.status(200).json({ success: true, message: 'Payment verified successfully.' })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.status(200).json({ success: false, message: 'Payment was cancelled. Order removed.' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Payment verification failed. Please contact support.' })
    }
}

// POST /api/order/list  (admin)
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to fetch orders. Please try again.' })
    }
}

// POST /api/order/userorders  (user)
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to fetch orders. Please try again.' })
    }
}

// POST /api/order/status  (admin)
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: 'Order ID and status are required.' })
        }

        const order = await orderModel.findByIdAndUpdate(orderId, { status })
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found.' })
        }

        res.status(200).json({ success: true, message: 'Order status updated.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to update order status. Please try again.' })
    }
}

export { placeOrder, placeOrderStripe, verifyStripe, allOrders, userOrders, updateStatus }
