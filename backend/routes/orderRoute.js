import express from 'express'
import { placeOrder, placeOrderStripe, verifyStripe, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import authUser from '../middlewares/auth.js'
import adminAuth from '../middlewares/adminAuth.js'

const orderRouter = express.Router()

// User routes
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/userorders', authUser, userOrders)

// Payment verification
orderRouter.post('/verifyStripe', authUser, verifyStripe)

// Admin routes
orderRouter.post('/list', allOrders)
orderRouter.post('/status', updateStatus)

export default orderRouter
