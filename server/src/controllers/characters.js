const { Router } = require("express");
const activitiesRouter = require('./activities');
const countriesRouter = require('./countries');

const router = Router();

router.use('/activities', activitiesRouter);
router.use('/countries', countriesRouter);

module.exports = router;