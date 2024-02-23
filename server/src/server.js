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

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Synchronizing with the database...');
    await conn.sync({force:true });
    console.log('Database synchronized successfully.');

    const countriesFromAPI = await fetchCountriesFromAPI();
    await saveCountriesToDatabase(countriesFromAPI)

    console.log(`Server connected on port: ${PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error.message);
  }
  

};


server.listen(PORT, startServer);

module.exports = server;
