const {
    getActivities,
    createActivity,
} = require('../controllers/activities');

const {
    getCountries,
    getCountryDetails,
    getCountriesByName,
} = require('../controllers/countries');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('¡Bienvenido!');
  });

// Definición de rutas
router.get('/activities', getActivities);
router.post('/activities', createActivity);
router.get('/countries/name', getCountriesByName);
router.get('/countries/:idPais', getCountryDetails);  
router.get('/countries', getCountries);

module.exports = router;