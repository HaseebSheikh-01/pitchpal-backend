// controllers/investorController.js
const { Investor, Startup, User, Sequelize } = require('../models');

// Helper function to convert array to string if needed
function parseEnumField(field) {
  if (Array.isArray(field)) {
    return field[0]; // Take the first element if array
  }
  return field;
}

// Create a new investor
exports.createInvestor = async (req, res) => {
  try {
    let {
      full_name,
      // location,
      company,
      position,
      funding_min,
      funding_max,
      industry,
      area,
      type_of_startup,
      // team_size,
    } = req.body;

    // Ensure enum fields are strings, not arrays
    industry = parseEnumField(industry);
    area = parseEnumField(area);
    type_of_startup = parseEnumField(type_of_startup);

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
      // location,
      company,
      position,
      funding_min,
      funding_max,
      industry,
      area,
      type_of_startup,
      // team_size,
    });

    return res.status(201).json({
      message: 'Investor created successfully',
      investor,
    });
  } catch (error) {
    console.error('Error creating investor:', error); // Log the full error
    return res.status(400).json({ error: error.message });
  }
};

// Get all investors
exports.getInvestors = async (req, res) => {
  try {
    const investors = await Investor.findAll({
      include: {
        model: User, // Include associated User data
        attributes: ['id', 'full_name', 'email'], // Fetch only specific fields from User model
      },
    });

    return res.status(200).json(investors);
  } catch (error) {
    console.error('Error fetching investors:', error.message);
    return res.status(500).json({ error: 'Failed to fetch investors' });
  }
};

// Match investors with startups based on preferences
exports.getMatchingStartups = async (req, res) => {
  const { investorId } = req.query;
  try {
    const investor = await Investor.findByPk(investorId);
    if (!investor) {
      return res.status(404).json({ status: 'error', message: 'Investor not found' });
    }

    // Query startups based on the investor's preferences
    const startups = await Startup.findAll({
      where: {
        // Match the categories using LIKE for string comparisons
        category_list: { [Sequelize.Op.like]: `%${investor.industry}%` },
        // Ensure funding is within the investor's range
        funding_total_usd: { [Sequelize.Op.between]: [investor.funding_min, investor.funding_max] },
        // Match by area
        country: investor.area,
        // Match by startup stage
        stage_of_business: investor.type_of_startup,
      }
    });

    return res.json({ status: 'success', data: startups });
  } catch (error) {
    console.error('Error matching startups:', error.message);
    return res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
