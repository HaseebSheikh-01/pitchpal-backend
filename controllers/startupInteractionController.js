const { Startup } = require('../models');

// Increment left swipes counter
exports.incrementLeftSwipe = async (req, res) => {
  try {
    const { startupId } = req.params;
    
    const startup = await Startup.findByPk(startupId);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    await startup.increment('left_swipes');
    await startup.reload();

    res.json({
      message: 'Left swipe recorded successfully',
      left_swipes: startup.left_swipes
    });
  } catch (error) {
    console.error('Error recording left swipe:', error);
    res.status(500).json({ message: 'Error recording left swipe' });
  }
};

// Increment right swipes counter
exports.incrementRightSwipe = async (req, res) => {
  try {
    const { startupId } = req.params;
    
    const startup = await Startup.findByPk(startupId);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    await startup.increment('right_swipes');
    await startup.reload();

    res.json({
      message: 'Right swipe recorded successfully',
      right_swipes: startup.right_swipes
    });
  } catch (error) {
    console.error('Error recording right swipe:', error);
    res.status(500).json({ message: 'Error recording right swipe' });
  }
};

// Increment views counter
exports.incrementViews = async (req, res) => {
  try {
    const { startupId } = req.params;
    
    const startup = await Startup.findByPk(startupId);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    await startup.increment('views');
    await startup.reload();

    res.json({
      message: 'View recorded successfully',
      views: startup.views
    });
  } catch (error) {
    console.error('Error recording view:', error);
    res.status(500).json({ message: 'Error recording view' });
  }
};

// Get all interaction counts for a startup
exports.getInteractionCounts = async (req, res) => {
  try {
    const { startupId } = req.params;
    console.log('Fetching counts for startupId:', startupId);
    
    const startup = await Startup.findByPk(startupId);
    if (!startup) {
      console.log('Startup not found for ID:', startupId);
      return res.status(404).json({ message: 'Startup not found' });
    }

    console.log('Startup found:', {
      id: startup.id,
      left_swipes: startup.left_swipes,
      right_swipes: startup.right_swipes,
      views: startup.views
    });

    const response = {
      left_swipes: startup.left_swipes || 0,
      right_swipes: startup.right_swipes || 0,
      views: startup.views || 0
    };

    console.log('Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error fetching interaction counts:', error);
    res.status(500).json({ 
      message: 'Error fetching interaction counts',
      error: error.message 
    });
  }
};

// Get left swipes count
exports.getLeftSwipes = async (req, res) => {
  try {
    const { startupId } = req.params;
    
    const startup = await Startup.findByPk(startupId);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    res.json({
      left_swipes: startup.left_swipes
    });
  } catch (error) {
    console.error('Error fetching left swipes:', error);
    res.status(500).json({ message: 'Error fetching left swipes' });
  }
};

// Get right swipes count
exports.getRightSwipes = async (req, res) => {
  try {
    const { startupId } = req.params;
    
    const startup = await Startup.findByPk(startupId);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    res.json({
      right_swipes: startup.right_swipes
    });
  } catch (error) {
    console.error('Error fetching right swipes:', error);
    res.status(500).json({ message: 'Error fetching right swipes' });
  }
};

// Get views count
exports.getViews = async (req, res) => {
  try {
    const { startupId } = req.params;
    
    const startup = await Startup.findByPk(startupId);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    res.json({
      views: startup.views
    });
  } catch (error) {
    console.error('Error fetching views:', error);
    res.status(500).json({ message: 'Error fetching views' });
  }
};