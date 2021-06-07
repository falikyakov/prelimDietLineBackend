const mongoose = require('mongoose');
require('mongoose-type-email');

mongoose.connect("mongodb+srv://falikyakovj:falik2020@cluster0.qon1w.mongodb.net/DietLinePre?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to MongoDB'))
    .catch((err) => console.log('failed to connect.... \n' + err));

const foodSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Calories: {
        type: Number,
        required: true
    },
    CaloriesFromFat: {
        type: Number,
        required: false
    },
    Carbohyrates: {
        type: Number,
        required: true
    },
    Proteins: {
        type: Number,
        required: true
    }
})


const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    HeightCM: {
        type: Number,
        required: true
    },
    StartWeightKG: {
        type: Number,
        required: true
    },
    WeeklyWeight: {
        type: [],
        required: false
    },
    Gender: {
        type: String,
        required: true
    },
    BMI: {
        type: Number,
        required: false
    },
    Email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    // DailyInput: {
    //     type: [{}],
    //     required: false
    // },
    // WeeklyInput: {
    //     type: [{}],
    //     required: false
    // },
    EntryDate: {
        type: Date,
        default: Date.now
    }
})


const goalSchema = mongoose.Schema({
    loseKgForWeek: {
        type: Number,
        required: false
    },
    excersize_minutes_per_day: {
        type: Number,
        required: true
    },
    calorieIntakePerDay: {
        type: Number,
        required: true
    },
    weekStartDate: {
        type: Date,
        requied: true
    }
})


const dailySchema = mongoose.Schema({
    breakfast: {
        foods: [],
        //foodCalories matches up with foods through index of array
        foodAmount:[],
        calories: {
            type: Number,
            required: true
        },
    },
    lunch: {
        foods: [],
        foodAmount: [],
        calories: {
            type: Number,
            required: true
        },
    },
    dinner: {
        foods: [],
        foodAmount: [],
        calories: {
            type: Number,
            required: true
        },
    },
    totalCal: {
        type: Number,
        required: false
    },
    excersizeMinutesDaily: {
        type: Number,
        required: true
    },
    day: {
        type: Date,
        default: Date.now
    },
    weekOf: {
        type: Date,
        required: true
    }
});


const weeklySchema = mongoose.Schema({
    totalPlannedCalories: {
        type: Number,
        required: true
    },
    weekStart: {
        type: Date,
        requied: true
    }
});


const weeklyActualSchema = mongoose.Schema({
    weekStart: {
        type: Date,
        requied: true
    },
    weightLostKg: {
        type: Number,
        required: true
    },
    avgCalories: {
        type: Number,
        required: true
    }
})


const dietPlanSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    goals: {
        type: [goalSchema],
        required: false
    },
    dailyPlanInput: {
        type: [dailySchema],
        require: false
    },
    weeklyPlanInput: {
        type: [weeklySchema],
        require: false
    },
    dailyActualInput: {
        type: [dailySchema],
        require: false
    },
    weeklyActualInput: {
        type: [weeklySchema],
        require: false
    }
});




module.exports.User = mongoose.model("User", userSchema);
module.exports.Food = mongoose.model("Food", foodSchema);
module.exports.DietPlan = mongoose.model("DietPlan", dietPlanSchema);