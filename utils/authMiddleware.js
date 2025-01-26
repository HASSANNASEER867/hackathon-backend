const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env; // Store your secret key in .env file

// Middleware to verify JWT token for authentication
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
        req.user = decoded; // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
