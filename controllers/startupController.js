const { Startup, Investor } = require('../models'); // Import models

// POST - Create a new startup
exports.createStartup = async (req, res) => {
  const {
    name,
    funding_total_usd,
    funding_rounds,
    continent,
    country,
    stage_of_business,
    industry,
    team_size,
    revenue_usd,
    // image,
  } = req.body;

  // Extract userId from the authenticated user's JWT token
  const userId = req.user.id;

  // Validation to ensure required fields are provided
  if (
    !name ||
    !funding_total_usd ||
    !funding_rounds ||
    !continent ||
    !country ||
    !stage_of_business ||
    !industry ||
    !team_size ||
    !revenue_usd
  ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create new startup with the provided data and the userId from the token
    const newStartup = await Startup.create({
      name,
      funding_total_usd,
      funding_rounds,
      continent,
      country,
      stage_of_business,
      industry,
      team_size,
      revenue_usd,
      // image,
      userId, // Set the userId as the owner of the startup
    });

    res.status(201).json({ message: 'Startup created successfully', startup: newStartup });
  } catch (error) {
    res.status(500).json({ message: 'Error creating startup', error: error.message });
  }
};

// GET - Get all startups for the logged-in user
exports.getAllStartups = async (req, res) => {
  const userId = req.user.id; // Get userId from JWT token payload
  try {
    const startups = await Startup.findAll({ where: { userId } });
    res.status(200).json({ startups });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching startups', error: error.message });
  }
};

// GET - Get a single startup by ID
exports.getStartupById = async (req, res) => {
  const { id } = req.params; // Get startup ID from URL parameter

  try {
    const startup = await Startup.findByPk(id); // Find startup by primary key (ID)

    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    res.status(200).json({ startup }); // Return the found startup
  } catch (error) {
    res.status(500).json({ message: 'Error fetching startup', error: error.message });
  }
};

// PUT - Update a startup
exports.updateStartup = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    funding_total_usd,
    funding_rounds,
    continent,
    country,
    stage_of_business,
    industry,
    team_size,
    revenue_usd,
    image,
  } = req.body;

  try {
    const startup = await Startup.findByPk(id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    // Update startup fields, keeping existing values if not provided
    startup.name = name || startup.name;
    startup.funding_total_usd = funding_total_usd || startup.funding_total_usd;
    startup.funding_rounds = funding_rounds || startup.funding_rounds;
    startup.continent = continent || startup.continent;
    startup.country = country || startup.country;
    startup.stage_of_business = stage_of_business || startup.stage_of_business;
    startup.industry = industry || startup.industry;
    startup.team_size = team_size || startup.team_size;
    startup.revenue_usd = revenue_usd || startup.revenue_usd;
    startup.image = image || startup.image;

    await startup.save();
    res.status(200).json({ message: 'Startup updated successfully', startup });
  } catch (error) {
    res.status(500).json({ message: 'Error updating startup', error: error.message });
  }
};

// DELETE - Delete a startup
exports.deleteStartup = async (req, res) => {
  const { id } = req.params;

  try {
    const startup = await Startup.findByPk(id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    await startup.destroy();
    res.status(200).json({ message: 'Startup deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting startup', error: error.message });
  }
};
