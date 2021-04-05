const express = require('express');
const router = express.Router();
const DBFind = require('../database/DBfind');
router.use('/dbfind', DBFind);


router.get('/find', (req, res) => {
    DBFind.dbFind((result) => {
        res.send(result);
    })
})

router.get('/findOne/:id', (req, res) => {
    DBFind.dbFindOne(req.params.id, (result) => {
        res.send(result);
    });
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    DBFind.dbLogin("falikyakov@gmail", "ffaalliikk", (result) => {
        res.send(result);
        console.log(result);
        console.log(email + " " + password);
    });
})

const DBinsert = require('../database/DBinsert');
router.use('/DBinsert', DBinsert);

module.exports = router;

