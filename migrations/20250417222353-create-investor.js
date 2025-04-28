// migrations/20250417222353-create-investor.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Investors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Referring to the Users table
          key: 'id', // Referring to the id field in Users table
        },
        onDelete: 'CASCADE', // If a user is deleted, the investor record will be deleted
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      investment_interests: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      funding_range: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      region_or_country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startup_stage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      team_size: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Investors');
  }
};
