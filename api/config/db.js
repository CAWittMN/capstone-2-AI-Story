const { Sequelize } = require("sequelize");
const { DB_URI } = require("./config");

const sequelize = new Sequelize(DB_URI);

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sq: sequelize, testDbConnection };
