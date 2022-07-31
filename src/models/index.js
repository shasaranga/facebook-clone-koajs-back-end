const { Op, Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig");
const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);
let db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASS, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  pool: dbConfig.POOL,
});

//Models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    var model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });
  console.log(db)
// Associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

module.exports = db;