const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json")["development"];

// Initialize Sequelize with config.json
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    operatorAliases: false,
  }
);

// Test DB connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Prepare db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models go here when created
// Example:
// db.User = require('./user.js')(sequelize, DataTypes);
db.User = require("./user.js")(sequelize, DataTypes);


// Run sync (optional for dev, not used in prod with migrations)
db.sequelize.sync({ force: false, alter: true })
  .then(() => console.log("✅ Database synced"));

module.exports = db;
