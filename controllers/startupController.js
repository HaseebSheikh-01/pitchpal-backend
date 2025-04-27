const { Startup } = require('../models'); // Import Startup model

// POST - Create a new startup
exports.createStartup = async (req, res) => {
  const {
    name,
    category_list,
    funding_total_usd,
    funding_rounds,
    founded_at,
    first_funding_at,
    last_funding_at,
    country_code,
    region,
    city,
    homepage_url,
  } = req.body;

  // Extract userId from the authenticated user's JWT token
  const userId = req.user.id; 

  // Validation to ensure required fields are provided
  if (!name || !category_list || !funding_total_usd || !funding_rounds) {
    return res.status(400).json({ message: 'Missing required fields: name, category_list, funding_total_usd, or funding_rounds' });
  }

  try {
    // Create new startup with the provided data and the userId from the token
    const newStartup = await Startup.create({
      name,
      category_list,
      funding_total_usd,
      funding_rounds,
      founded_at,
      first_funding_at,
      last_funding_at,
      country_code,
      region,
      city,
      homepage_url,
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
    category_list,
    funding_total_usd,
    funding_rounds,
    founded_at,
    first_funding_at,
    last_funding_at,
    country_code,
    region,
    city,
    homepage_url,
  } = req.body;

  try {
    const startup = await Startup.findByPk(id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    // Update startup fields, keeping existing values if not provided
    startup.name = name || startup.name;
    startup.category_list = category_list || startup.category_list;
    startup.funding_total_usd = funding_total_usd || startup.funding_total_usd;
    startup.funding_rounds = funding_rounds || startup.funding_rounds;
    startup.founded_at = founded_at || startup.founded_at;
    startup.first_funding_at = first_funding_at || startup.first_funding_at;
    startup.last_funding_at = last_funding_at || startup.last_funding_at;
    startup.country_code = country_code || startup.country_code;
    startup.region = region || startup.region;
    startup.city = city || startup.city;
    startup.homepage_url = homepage_url || startup.homepage_url;

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
