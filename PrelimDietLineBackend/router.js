const express = require('express');
const router = express.Router();

const DBcontroller = require('./controllers/DBcontroller');
router.use('/db', DBcontroller);


module.exports = router;