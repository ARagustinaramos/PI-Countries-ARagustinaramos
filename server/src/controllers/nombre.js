const express = require('express');
const {Countries } = require ('../server');

const nombre = express.Router();

nombre.get('/countries/name', async (req, res) => {
    const {name}= req.query;
try{
    const countries = await Countries.findAll({  // busca paises que coincidan
        where: {name: {like:`%${name}%`}},
    });
    if (countries.length === 0){         // no encuentra paises
        return res.status(404).json({menssage: 'No se encontraron paises con ese nombre'});
    }
    res.json(countries);               //devuelve los paises encontrados
} catch(error){
    console.log(error);
    res.status(500).json({menssage: 'Error al obtener paises con ese nombre'})
}
});

module.exports=nombre;


