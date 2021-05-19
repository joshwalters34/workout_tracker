const router = require('express').Router();

const apiRoutes = require('./api/apiRoutes');


router.use('/apiRoutes', apiRoutes);


module.exports = router;
