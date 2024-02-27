const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { conn } = require('./db');
const router = require('./routes');
const { fetchCountriesFromAPI, saveCountriesToDatabase } = require('./utilsCountry');
const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use(router);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    console.log('Sincronizando con la base de datos...');
    await conn.sync({force:true });
    console.log('Data base sincronizada.');

    const countriesFromAPI = await fetchCountriesFromAPI();
    await saveCountriesToDatabase(countriesFromAPI)

    console.log(`Server conectado en el puerto: ${PORT}`);
  } catch (error) {
    console.error('Error al conectarse con el server:', error.message);
  }
  

};


server.listen(PORT, startServer);

module.exports = server;
