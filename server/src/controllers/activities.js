const { Activity, Country } = require('../db');

const getActivities = async (req, res) => {
    try{
        const activities = await Activity.findAll();  //busca las actividades

        res.json(activities);
    }catch (error){
        console.log(error);
        res.status(500).json({menssage: 'Error al obtener actividades turísticas'});
        
    }
};

const createActivity= async (req, res) => {
    const {id, name, difficulty, duration, season, countries} = req.body;

    try {
        const activity = await Activity.create({  // crea la actividad
            id,
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
};

module.exports = {
    getActivities,
    createActivity,
};