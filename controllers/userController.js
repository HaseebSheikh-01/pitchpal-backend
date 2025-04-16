const db = require("../models");
const User = db.User;

exports.updateRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // Validate the role
    if (!['startup', 'investor', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's role
    user.role = role;
    await user.save();

    // Return the updated user info
    res.status(200).json({
      message: 'Role updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
