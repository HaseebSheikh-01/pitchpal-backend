module.exports = (sequelize, DataTypes) => {
  const Investor = sequelize.define('Investor', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',  // Referring to the Users table
        key: 'id',  // Referring to the id field in Users table
      },
      onDelete: 'CASCADE',
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensures full_name is required
      validate: {
        notEmpty: true,  // Validation to check that the full_name is not empty
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Ensures email is unique
      validate: {
        isEmail: true,  // Validation to check if the email format is correct
      },
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    funding_min: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    funding_max: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
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
    area: {
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
    type_of_startup: {
      type: DataTypes.ENUM,
      values: [
        'Seed',
        'Early Stage',
        'Growth Stage',
        'Late Stage',
      ],
      allowNull: false,
    },
    team_size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Investor.associate = (models) => {
    Investor.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Investor;
};
