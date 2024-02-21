const Activity = require('../models/Activity');

const router = require('express').Router();

router.get('/activities', activities);
router.post('/activities', activity);
router.get('/countries/name', nombre);
router.get('/:idPais', detalles);
router.get('/countries', countriesInfo)



module.exports = router;
