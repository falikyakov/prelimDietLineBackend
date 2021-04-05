const mongo = require('./mongooseConnect');
const express = require('express');
const router = express.Router();


const dbFind = async (show) => {
    const result = await mongo.User.find();
    console.log(result);
    show(result);
}
const dbFindOne = async (id, show) => {
    const result = await mongo.User.findById({ _id: id });
    console.log(result);
    show(result);
}


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    mongo.User.findOne({ Email: email, Password: password }, (err, result) => {
        if (err) {
            res.send(err);
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
});

router.post('/login2', (req, res) => {
    const userId = req.body.userId;
    mongo.DietPlan.findOne({ userId: userId }, (err, result) => {
        if (err) {
            res.send(err);
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
});



// const dbLogin = (email, password, show) => {
//     mongo.User.findOne({ Email: email, Password: password }, (err, result) => {
//         if (err) {
//             show(err);
//         } else {
//             show(result);
//         }
//     })
// }


module.exports = router;
module.exports.dbFind = dbFind;
module.exports.dbFindOne = dbFindOne;
