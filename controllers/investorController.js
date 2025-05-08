const { Investor, User, Startup, Sequelize } = require('../models'); // Ensure Startup is imported

// Helper function to convert array to string if needed
function parseEnumField(field) {
  if (Array.isArray(field)) {
    return field.join(", "); // Join the array into a string separated by commas
  }
  return field;
}

// Create a new investor
exports.createInvestor = async (req, res) => {
  try {
    let {
      full_name,
      location,
      company,
      position,
      funding_min,
      funding_max,
      industry,
      area,
      type_of_startup,
      team_size,
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
      location,
      company,
      position,
      funding_min,
      funding_max,
      industry,
      area,
      type_of_startup,
      team_size,
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
        attributes: ['id', 'name', 'email'], // Assuming 'name' is the correct column
      },
    });

    return res.status(200).json(investors);
  } catch (error) {
    console.error('Error fetching investors:', error.message);
    return res.status(500).json({ error: 'Failed to fetch investors' });
  }
};

// Match startups by userId
exports.matchStartupsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const investor = await Investor.findOne({ where: { userId } });
    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    // Find startups matching ANY of the investor's preferences
    const { Op } = require('sequelize');
    const startups = await Startup.findAll({
      where: {
        [Op.or]: [
          {
            funding_total_usd: {
              [Op.between]: [investor.funding_min, investor.funding_max],
            },
          },
          { industry: investor.industry },
          { continent: investor.area },
          { stage_of_business: investor.type_of_startup },
        ],
      },
    });

    return res.status(200).json({ startups });
  } catch (error) {
    console.error('Error matching startups:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get investor by userId
exports.getInvestorByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the investor by the userId
    const investor = await Investor.findOne({
      where: { userId },
      include: {
        model: User, // Include associated User data
        attributes: ['id', 'name', 'email'], // Change 'full_name' to 'name' (or correct column)
      },
    });

    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    return res.status(200).json({
      investor: {
        id: investor.id,
        full_name: investor.full_name,
        company: investor.company,
        position: investor.position,
        funding_min: investor.funding_min,
        funding_max: investor.funding_max,
        industry: investor.industry,
        area: investor.area,
        type_of_startup: investor.type_of_startup,
        team_size: investor.team_size,
        email: investor.email, // from User
      },
    });
  } catch (error) {
    console.error('Error fetching investor by userId:', error.message);
    return res.status(500).json({ error: 'Failed to fetch investor' });
  }
};

// Update an investor's details
exports.updateInvestor = async (req, res) => {
  const { userId } = req.params;
  try {
    const investor = await Investor.findOne({ where: { userId } });

    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    let {
      full_name,
      location,
      company,
      position,
      funding_min,
      funding_max,
      industry,
      area,
      type_of_startup,
      team_size,
    } = req.body;

    // Update the investor fields
    investor.full_name = full_name || investor.full_name;
    investor.location = location || investor.location;
    investor.company = company || investor.company;
    investor.position = position || investor.position;
    investor.funding_min = funding_min || investor.funding_min;
    investor.funding_max = funding_max || investor.funding_max;
    investor.industry = industry || investor.industry;
    investor.area = area || investor.area;
    investor.type_of_startup = type_of_startup || investor.type_of_startup;
    investor.team_size = team_size || investor.team_size;

    // Save the updated record
    await investor.save();

    return res.status(200).json({
      message: 'Investor updated successfully',
      investor,
    });
  } catch (error) {
    console.error('Error updating investor:', error.message);
    return res.status(500).json({ error: 'Failed to update investor' });
  }
};
