import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: 'Forbidden. Admin access only.' })
        }
        next()
    } catch {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' })
    }
}

export default adminAuth
