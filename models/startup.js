// models/startup.js
module.exports = (sequelize, DataTypes) => {
  const Startup = sequelize.define('Startup', {
    // Foreign Key to link this startup to a user
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming a User model exists
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    // Startup name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Comma-separated or tag-style categories
    category_list: {
      type: DataTypes.STRING, // You can also use ARRAY if you want to store as a list
      allowNull: false,
    },

    // Total funding raised in USD
    funding_total_usd: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

    // Number of funding rounds
    funding_rounds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Date the startup was founded
    founded_at: {
      type: DataTypes.DATEONLY, // Use DATEONLY to avoid time info
      allowNull: false,
    },

    // Date of the first funding round
    first_funding_at: {
      type: DataTypes.DATEONLY, // Use DATEONLY for date without time
      allowNull: true, // Nullable as not all startups may have a funding date
    },

    // Date of the latest funding round
    last_funding_at: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Nullable as not all startups may have had a recent round
    },

    // ISO country code
    country_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Region (state, province)
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // City where the startup is based
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Official website URL
    homepage_url: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable as not every startup may have a website
    },
  });

  // Associations
  Startup.associate = (models) => {
    // A startup belongs to a user (owner)
    Startup.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Startup;
};
