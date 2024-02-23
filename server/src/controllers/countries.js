
const { Activity, Country } = require('../db');



const getCountries= async (req, res) =>{
    try{
        const countries = await Country.findAll();
        res.json(countries);
    }catch (error){
        console.log(error);
        res.status(500).json({menssage: 'Error al obtener los paises'});
    }
};

const getCountryDetails= async (req, res) =>{
    const{ idPais } = req.params;

try {
    const country = await Country.findOne({ // busco el pais por su id
        where: {id: idPais},
        include: Activity,                   // incluye actividades asosiadas a ese pais
    });
    if (!country){                           //si el pais no se encuentra
        return res.status(404).json({message : 'Pais no encontrado'});
    }
    res.json(country);                       //devuelve el pais con sus actividades
}catch ( error){
    console.log(error);
    res.status(500).json({mensage: 'Error al obtener detalle del pais'})
}
};

const getCountriesByName = async (req, res) => {
    const {name}= req.query;
try{
    const countries = await Country.findAll({  // busca paises que coincidan
        where: {name: {[op.like]:`%${name}%`}},
    });
    if (countries.length === 0){         // no encuentra paises
        return res.status(404).json({menssage: 'No se encontraron paises con ese nombre'});
    }
    res.json(countries);               //devuelve los paises encontrados
} catch(error){
    console.log(error);
    res.status(500).json({menssage: 'Error al obtener paises con ese nombre'})
}
};
module.exports = {
    getCountries,
    getCountryDetails,
    getCountriesByName,
};