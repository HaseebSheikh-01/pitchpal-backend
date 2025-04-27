const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const User = require('../models').User; // Sequelize User model
=======
const { User } = require('../models'); // Sequelize User model
>>>>>>> origin/creating-investor

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

<<<<<<< HEAD
    // Check if the user exists in the database
    const user = await User.findByPk(decoded.id);
=======
    // Fetch the user from the database to get the email
    const user = await User.findByPk(decoded.id); // Use the userId from the JWT token to fetch the user from the User table

>>>>>>> origin/creating-investor
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

<<<<<<< HEAD
    // Proceed to the next middleware or route handler if the user exists
=======
    // Attach the email to the req.user object
    req.user.email = user.email; // Fetch and attach email from User model

    // Proceed to the next middleware or route handler
>>>>>>> origin/creating-investor
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
