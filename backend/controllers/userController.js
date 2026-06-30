import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET)

// POST /api/user/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required.' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Enter a valid email address.' })
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' })
        }

        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(409).json({ success: false, message: 'An account with this email already exists.' })
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = new userModel({ name, email, password: hashed })
        await user.save()

        const token = createToken(user._id)
        res.status(201).json({ success: true, token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Registration failed. Please try again.' })
    }
}

// POST /api/user/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: 'No account found with this email.' })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ success: false, message: 'Incorrect password.' })
        }

        const token = createToken(user._id)
        res.status(200).json({ success: true, token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Login failed. Please try again.' })
    }
}

// POST /api/user/admin
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' })
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.status(200).json({ success: true, token })
        }

        res.status(401).json({ success: false, message: 'Invalid admin credentials.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Login failed. Please try again.' })
    }
}

export { registerUser, loginUser, adminLogin }
