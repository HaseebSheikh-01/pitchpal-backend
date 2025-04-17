// migrations/<timestamp>-create-startup.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Startups', {
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
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_list: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      funding_total_usd: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      funding_rounds: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      founded_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      first_funding_at: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      last_funding_at: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      homepage_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Startups');
  },
};
