const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authorization token not found' });
    }

    // Verify token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded JWT:', decoded); // Log the decoded token to check the contents

    // Find the user based on the decoded token's user ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach the user to the request object
    return next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // console.error('Error in authentication middleware:', error); // Log the error
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth;
