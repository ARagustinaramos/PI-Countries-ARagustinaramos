const express = require ('express');
const {Country, Activity } = require('../server');

const actividades = express.Router();

actividades.post('/activities', async (req, res) => {
    const {name, difficulty, duration, season, countries} = req.body;

    try {
        const activity = await Activity.create({  // crea la actividad
            name,
            difficulty,
            duration,
            season,
        });
    if(countries && countries.length > 0){         //relaciona la actividad con el pais
        const selectedCountries= await Country.findAll({
            where : {id:countries},
        });
        await activity.setCountries(selectedCountries);
    }else{
        await activity.destroy();                 //si no proporciona pais elimina la actividade creada
        return res.status(400).json({menssage: 'Debe proporcionar un pais '});
    }
    res.status(201).json(activity);              //devuelve la actividade creada
    }catch(error) {
        console.log(error);
        res.status(500).json({menssge: 'Error al crear actividad'})
    }
});

module.exports=actividades;