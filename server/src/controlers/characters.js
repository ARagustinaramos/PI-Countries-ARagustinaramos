const { Router } = require("express");
const { Activity , Country } =  require('../db');

const router = Router();

router.get('/activities', async (req, res) => {
    try{
        const activities = await Activity.findAll();  //busca las actividades

        res.json(activities);
    }catch (error){
        console.log(error);
        res.status(500).json({menssage: 'Error al obtener actividades turísticas'});
        
    }
});

router.post('/activities', async (req, res) => {
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
});

router.get('/countries', async (req, res) =>{
    try{
        const countries = await Country.findAll();
        res.json(countries);
    }catch (error){
        console.log(error);
        res.status(500).json({menssage: 'Error al obtener los paises'});
    }
});

router.get('/:idPais', async (req, res) =>{
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
});

router.get('/countries/name', async (req, res) => {
    const {name}= req.query;
try{
    const countries = await Country.findAll({  // busca paises que coincidan
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


module.exports = router;