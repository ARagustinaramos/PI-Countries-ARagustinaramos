const express = require ('express');
const { Countries, Activity} = require ('../server')


const detalle = express.Router();

detalle.get('/:idPais', async (req, res) =>{
    const{ idPais } = req.query;

try {
    const country = await Countries.findOne({ // busco el pais por su id
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
})

module.exports = detalle;