const axios = require('axios');
const { Country } = require('./db');

// Función para obtener países desde la API
const fetchCountriesFromAPI = async () => {
  try {
    console.log('Fetching countries from API...');
    const response = await axios.get('http://localhost:5000/countries');
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries from API:', error.message);
    throw error;
  }
};

// Función para guardar países en la base de datos
const saveCountriesToDatabase = async (countries) => {
    const t = await Country.sequelize.transaction(); // Inicia una transacción
  
    try {
      console.log('Synchronizing with the database...');
      await Country.sync({ force: true }); // Sincroniza el modelo antes de realizar operaciones, forzando la eliminación de la tabla
  
      console.log('Deleting existing countries...');
      await Country.destroy({ where: {}, transaction: t }); // Eliminar todos los países existentes antes de guardar los nuevos
  
      console.log('Mapping and saving new countries...');
      for (const countryData of countries) {
        const {
          cca3,
          name,
          flags,
          region,
          capital,
          subregion,
          area,
          population,
          languages,
        } = countryData;
        if (capital) { 
        await Country.create({
          id: cca3,
          name,
          flagImage: flags?.svg,
          continent: region,
          capital,
          subregion,
          area,
          population,
          region,
          languages,
        }, { transaction: t });
      }
    }
      console.log('Countries saved to the database.');
  
      await t.commit(); // Confirma la transacción si todas las operaciones fueron exitosas
    } catch (error) {
      console.error('Error saving countries to the database:', error.message);
      await t.rollback(); // Revierte la transacción en caso de error
      throw error;
    }
  };
  
  module.exports = { fetchCountriesFromAPI, saveCountriesToDatabase };