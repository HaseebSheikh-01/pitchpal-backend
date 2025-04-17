const jwt = require('jsonwebtoken');
const User = require('../models').User; // Sequelize User model

// Middleware to check for valid token
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request
    req.user = decoded; // decoded contains the user id, role, and expiration time

    // Check if the user exists in the database
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Proceed to the next middleware or route handler if the user exists
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
