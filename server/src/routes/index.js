const router = require('express').Router();
const actividad = require('../controllers/actividad');
const actividades = require('../controllers/actividades');
const countriesInfo = require('../controllers/countriesInfo');
const detalles = require('../controllers/detalles');
const nombre = require('../controllers/nombre');

router.get('/activities', actividad);
router.post('/activities', actividades);
router.get('/countries/name', nombre);
router.get('/:idPais', detalles);
router.get('/countries', countriesInfo)



module.exports = router;
