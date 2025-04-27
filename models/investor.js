// models/investor.js
module.exports = (sequelize, DataTypes) => {
    const Investor = sequelize.define('Investor', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Reference to the 'Users' table
          key: 'id', // Reference to the 'id' field of Users table
        },
        onDelete: 'CASCADE',
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      investment_interests: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      funding_range: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      region_or_country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startup_stage: {
        type: DataTypes.STRING,
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
        as: 'user', // Alias for the association
      });
    };
  
    return Investor;
  };
  