const express = require ('express');
const { Activity } =  require('../server');

const actividad = express.Router();

actividad.get('/activities', async (req, res) => {
    try{
        const activities = await Activity.findAll();  //busca las actividades

        res.json(activities);
    }catch (error){
        console.log(error);
        res.status(500).json({menssage: 'Error al obtener actividades turísticas'});
        
    }
});

module.exports = actividad;