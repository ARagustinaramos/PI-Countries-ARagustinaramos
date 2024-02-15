const express = require ('express');
const { Country } = require('../server');

const countriesInfo = express.Router();

countriesInfo.get('/countries', async (req, res) =>{
    try{
        const countries = await Country.findAll();
        res.json(countries);
    }catch (error){
        console.log(error);
        res.status(500).json({menssage: 'Error al obtener los paises'});
    }
})

module.exports = countriesInfo;