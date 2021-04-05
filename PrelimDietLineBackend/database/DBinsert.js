const express = require('express');
const router = express.Router();
const mongo = require('./mongooseConnect');


router.post('/insertUser', (req, res) => {
    console.log("Hello nodeJS")
    try {
        const insertUser = async () => {
            console.log('Hi there');

            const kg = req.body.weight;
            const ht = req.body.height / 100;
            const htsq = ht * ht;
            const bmi = kg / htsq;

            const newUser = new mongo.User({
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                DateOfBirth: req.body.dob,
                HeightCM: req.body.height,
                StartWeightKG: req.body.weight,
                Gender: req.body.gender,
                BMI: bmi,
                Email: req.body.email,
                Password: req.body.password
            })
            const userResult = await newUser.save();


            const newDietPlan = new mongo.DietPlan({
                userId: userResult._id,
                userEmail: userResult.Email,
                goals:[],
                dailyPlanInput: [],
                weeklyPlanInput: [],
                dailyActualInput: [],
                weeklyActualInput: []
            })
            const planResult = await newDietPlan.save();

            res.send(userResult);
            console.log(userResult);
            console.log(userResult.EntryDate.getDate() + "/" + userResult.EntryDate.getMonth() + "/" + userResult.EntryDate.getFullYear());
            console.log(planResult);
        };
        insertUser();
    }
    catch (error) {
        console.error(error);
    }
})


router.post('/insertGoal', (req, res) => {
    console.log("Hello goals")
    try {
        const insertGoal = async (userId) => {
            console.log('Hi Goal');

            userId = req.body.userId;

            const goals = {
                loseKg : req.body.kgToLose,
                excersize_minutes : req.body.excersizePlanned,
                calorieIntake : req.body.caloriesToLose
            }
            
            // const user = await mongo.DietPlan.findOne({ userId: userId });
            // if (!user) return
            // user.set({
            //     goals:goals
            // })
            console.log(goals);

            mongo.DietPlan.updateOne(
                { userId:userId },
                { $push: { goals: [goals] } },
                function (err, result) {
                    if (err) {
                        res.send(err);
                        console.log(err)
                    } else {
                        res.send(result);
                    }
                }
            );

          
          
        };
        insertGoal();
    }
    catch (error) {
        console.error(error);
    }
})



module.exports = router;