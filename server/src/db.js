require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false,
});

const modelDefiners = [];

// Cargar modelos desde el directorio 'models'
fs.readdirSync(path.join(__dirname, 'models'))
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const modelDefiner = require(path.join(__dirname, 'models', file));
    modelDefiners.push(modelDefiner);
  });

// Definir todos los modelos
modelDefiners.forEach(modelDefiner => modelDefiner(sequelize));

// Establecer relaciones entre modelos
const { Country, Activity } = sequelize.models;
Country.belongsToMany(Activity, { through: "country_activity" });
Activity.belongsToMany(Country, { through: "country_activity" });

// Exportar modelos y la instancia de Sequelize
module.exports = {
  Country,
  Activity,
  sequelize,
};

