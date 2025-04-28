const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Sequelize User model

// Middleware to check for valid token
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token with the secret key (JWT_SECRET should be in your .env file)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data (user id, role, expiration) to the request
    req.user = decoded;

    // Fetch the user from the database using the userId from the JWT token
    const user = await User.findByPk(decoded.id); // Using the userId (decoded.id) from the JWT token to fetch the user

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the email to the req.user object for easy access in further routes
    req.user.email = user.email;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Provide a more detailed error message, including whether the token expired or is invalid
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
