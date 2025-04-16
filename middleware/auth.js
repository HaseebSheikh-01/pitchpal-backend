const jwt = require('jsonwebtoken');
const User = require('../models').User; // Sequelize User model

// Middleware to check for valid token
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request
    req.user = decoded; // decoded contains the user id, role, and expiration time

    // Optionally: you can check if the user still exists in the database
    User.findByPk(decoded.id)
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        next(); // Proceed to the next middleware or route handler if the user exists
      })
      .catch(err => {
        res.status(500).json({ message: 'Server error while verifying user' });
      });

  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
