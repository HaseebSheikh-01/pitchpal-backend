// controllers/investorController.js
const { Investor, User } = require('../models');

// Create a new investor
exports.createInvestor = async (req, res) => {
  try {
    const { full_name, phone_number, location, investment_interests, funding_range, region_or_country, startup_stage, team_size } = req.body;

    const userId = req.user.id; // Extract userId from JWT token
    const user = await User.findByPk(userId); // Find the user by ID
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const email = user.email; // Fetch the email from the User model

    // Create new Investor record in the database
    const investor = await Investor.create({
      userId,
      full_name,
      email, // Use the email fetched from the User model
      phone_number,
      location,
      investment_interests,
      funding_range,
      region_or_country,
      startup_stage,
      team_size,
    });

    return res.status(201).json({
      message: 'Investor created successfully',
      investor,
    });
  } catch (error) {
    console.error('Error creating investor:', error.message);
    return res.status(400).json({ error: error.message });
  }
};

// Get all investors
exports.getInvestors = async (req, res) => {
  try {
    const investors = await Investor.findAll({
      include: {
        model: User, // Include associated User data
        as: 'user', // Alias for the relationship
        attributes: ['id', 'full_name', 'email'], // Fetch only specific fields from User model
      },
    });

    return res.status(200).json(investors);
  } catch (error) {
    console.error('Error fetching investors:', error.message);
    return res.status(500).json({ error: 'Failed to fetch investors' });
  }
};
