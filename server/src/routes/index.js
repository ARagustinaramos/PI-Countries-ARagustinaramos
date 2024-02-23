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
router.get('/countries', getCountries);
router.get('/:idPais', getCountryDetails);

module.exports = router;