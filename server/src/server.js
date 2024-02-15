const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, BDD} = process.env;
const CountryModel = require('./models/Countries');
const ActivityModel = require ('./models/Activity');
const countriesInfo = require ('./controllers/countriesInfo')

const server = express();
const PORT = 5000;


const sequelize = new Sequelize(
 `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`,
    { logging: false, native: false }
 );  

 // registro los modelos
const Country = CountryModel(sequelize);
const Activity = ActivityModel(sequelize);

//relacion de los modelos

 Country.belongsToMany(Activity, { through: 'CountryActivity' });
 Activity.belongsToMany(Country, { through: 'CountryActivity' });



//sincronizo e inicializo
sequelize.sync({ force: false }).then(() => {
    server.use('/', countriesInfo);

    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  }).catch((error) => {
    console.log('Error al sincronizar con la base de datos:', error);
  });

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports = server;
