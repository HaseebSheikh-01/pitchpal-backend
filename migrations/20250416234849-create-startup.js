// migrations/20250416234849-create-startup.js
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
      funding_total_usd: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      funding_rounds: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      continent: {
        type: Sequelize.ENUM,
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
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stage_of_business: {
        type: Sequelize.ENUM,
        values: [
          'Seed',
          'Bootstrap',
          'Early Stage',
          'Growth Stage',
          'Late Stage',
        ],
        allowNull: false,
      },
      industry: {
        type: Sequelize.ENUM,
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
      team_size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      revenue_usd: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // New field for Consumer Base
      consumer_base: {
        type: Sequelize.INTEGER,
        allowNull: false,  // This field is mandatory
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
    // In case we want to rollback this migration, we will drop the Startups table
    await queryInterface.dropTable('Startups');
  },
};