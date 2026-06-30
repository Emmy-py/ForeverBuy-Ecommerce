import userModel from '../models/userModel.js'

// POST /api/cart/get
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' })
        }

        res.status(200).json({ success: true, cartData: user.cartData })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to fetch cart. Please try again.' })
    }
}

// POST /api/cart/add
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body

        if (!itemId || !size) {
            return res.status(400).json({ success: false, message: 'Item ID and size are required.' })
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' })
        }

        const cartData = user.cartData

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1
        } else {
            cartData[itemId] = { [size]: 1 }
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: 'Item added to cart.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to update cart. Please try again.' })
    }
}

// POST /api/cart/update
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body

        if (!itemId || !size || quantity === undefined) {
            return res.status(400).json({ success: false, message: 'Item ID, size, and quantity are required.' })
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' })
        }

        const cartData = user.cartData
        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: 'Cart updated.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to update cart. Please try again.' })
    }
}

export { getUserCart, addToCart, updateCart }
