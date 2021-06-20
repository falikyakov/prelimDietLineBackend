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
            const idealWeight = htsq * 25;

            const newUser = new mongo.User({
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                DateOfBirth: req.body.dob,
                HeightCM: req.body.height,
                StartWeightKG: req.body.weight,
                LoseKgGoal:req.body.loseKgGoal,
                Gender: req.body.gender,
                BMI: bmi,
                IdealWeight:idealWeight,
                Email: req.body.email,
                Password: req.body.password
            })
            const userResult = await newUser.save();


            const newDietPlan = new mongo.DietPlan({
                userId: userResult._id,
                userEmail: userResult.Email,
                goals: [],
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
    try {
        const insertGoal = async (userId) => {
            console.log('Hi Goal');

            userId = req.body.userId;

            const goals = {
                loseKgForWeek: req.body.kgToLose,
                excersize_minutes_per_day: req.body.excersizePlanned,
                calorieIntakePerDay: req.body.caloriesToLose,
                weekStartDate: req.body.weekStartDate
            }

            // const user = await mongo.DietPlan.findOne({ userId: userId });
            // if (!user) return
            // user.set({
            //     goals:goals
            // })
            //console.log(goals);

            console.log("goalArray: " + goals.calorieIntake);
            console.log(req.body.kgToLose,
                req.body.excersizePlanned,
                req.body.caloriesToLose,
                req.body.weekStartDate
            )

            mongo.DietPlan.updateOne(
                { userId: userId },
                { $push: { goals: goals } },
                function (err, result) {
                    if (err) {
                        res.send(err);
                        console.log(err)
                    } else {
                        res.send(result);
                        console.log(userId + " " + result);
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

router.post('/insertDailyPlan', (req, res) => {
    try {
        const insertDailyPlan = async (userId) => {
            console.log('Hi insert daily plan');

            userId = req.body.userId;

            const dailyPlanInput = {
                breakfast: req.body.breakfast,
                lunch: req.body.lunch,
                dinner: req.body.dinner,
                excersizeMinutesDaily: req.body.excersizeMinutesDaily,
                totalCal: req.body.totalCalories,
                day: req.body.day,
                weekOf: req.body.weekOf
            }

            console.log("dailyPlanInput: " + dailyPlanInput.breakfast.foods);

            mongo.DietPlan.updateOne(
                { userId: userId },
                { $push: { dailyPlanInput: dailyPlanInput } },
                function (err, result) {
                    if (err) {
                        res.send(err);
                        console.log(err)
                    } else {
                        res.send(result);
                        console.log(userId + " " + result);
                    }
                }
            );



        };
        insertDailyPlan();
    }
    catch (error) {
        console.error(error);
    }
})


router.post('/insertDailyActual', (req, res) => {
    try {
        const insertDailyActual = async (userId) => {
            console.log('Hi insert daily actual');

            userId = req.body.userId;

            const dailyPlanActual = {
                breakfast: req.body.breakfast,
                lunch: req.body.lunch,
                dinner: req.body.dinner,
                excersizeMinutesDaily: req.body.excersizeMinutesDaily,
                totalCal: req.body.totalCalories,
                day: req.body.day
            }

            console.log("dailyPlanActual: " + dailyPlanActual.breakfast);

            mongo.DietPlan.updateOne(
                { userId: userId },
                { $push: { dailyActualInput: dailyPlanActual } },
                function (err, result) {
                    if (err) {
                        res.send(err);
                        console.log(err)
                    } else {
                        res.send(result);
                        console.log(userId + " " + result);
                    }
                }
            );



        };
        insertDailyActual();
    }
    catch (error) {
        console.error(error);
    }
})




module.exports = router;