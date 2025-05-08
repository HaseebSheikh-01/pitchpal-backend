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
    // Continent
    continent: {
      type: DataTypes.ENUM,
      values: [
        'North America',
        'Europe',
        'Asia',
        'South America',
        'Africa',
        'Australia',
      ],
      allowNull: false,
    },
    // Country name
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Stage of business
    stage_of_business: {
      type: DataTypes.ENUM,
      values: [
        'Seed',
        'Bootstrap',
        'Early Stage',
        'Growth Stage',
        'Late Stage',
      ],
      allowNull: false,
    },
    // Industry
    industry: {
      type: DataTypes.ENUM,
      values: [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'Energy',
        'Retail',
        'Manufacturing',
        'Real Estate',
        'AI & Machine Learning',
        'E-commerce',
        'Blockchain',
        'Biotech',
      ],
      allowNull: false,
    },
    // Team size
    team_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Revenue in USD
    revenue_usd: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    // Image URL or path
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Consumer Base (new field)
    consumer_base: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Adjust this to true if you want to allow null values
    },
  });

  // Associations
  Startup.associate = (models) => {
    // A startup belongs to a user (owner)
    Startup.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Startup;
};