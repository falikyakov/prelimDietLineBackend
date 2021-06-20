const express = require('express');
const router = express.Router();
const mongo = require('./mongooseConnect');

const deleteGoal = async () => {
    await mongo.DietPlan.updateOne(
        {
            userId: "6045e867e203e344f0335ddf"
        },
        {
            $pull: {
                goals: { weekStartDate: "2021-05-15T00:00:00.000+00:00" }
            }
        }
    )
}

router.post('/deleteGoal', (req, res) => {
    try {
        const deleteGoal = async (userId) => {

            userId = req.body.userId;

            const weekStartLess = new Date(req.body.weekStartLess);
            const weekStartMore = new Date(req.body.weekStartMore);

            const info = {
                weekStartDate: req.body.weekStartDate,
                weekStartLess: req.body.weekStartLess,
                weekStartMore: req.body.weekStartMore
            }

            console.log('Hi update User \n ' + weekStartLess);


            mongo.DietPlan.updateOne(
                { userId: userId },
                {
                    $pull:
                    {
                        goals: {
                            weekStartDate: {
                                "$gte": weekStartLess,
                                "$lt": weekStartMore
                            }
                        }
                    }
                },
                function (err, result) {
                    if (err) {
                        res.send(err);
                        console.log(err)
                    } else {
                        res.send(result);
                        console.log("success");
                    }
                }
            );



        };
        deleteGoal();
    }
    catch (error) {
        console.error(error);
    }
})

module.exports = router;