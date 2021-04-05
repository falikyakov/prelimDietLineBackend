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
    DailyInput: {
        type: [{}],
        required: false
    },
    WeeklyInput: {
        type: [{}],
        required: false
    },
    EntryDate: {
        type: Date,
        default: Date.now
    }
})


const goalSchema = mongoose.Schema({
    loseKg: {
        type: Number,
        required:false
    },
    excersize_minutes: {
        type: Number,
        required:true
    },
    calorieIntake: {
        type: Number,
        required: true
    }
})


const dailySchema = mongoose.Schema({
    breakfast: {
        foods: [],
        calories: {
            type: Number,
            required: true
        },
        carbohydrates: Number,
        proteins: Number
    },
    lunch: {
        foods: [],
        calories: {
            type: Number,
            required: true
        },
        carbohydrates: Number,
        proteins: Number
    },
    dinner: {
        foods: [],
        calories: {
            type: Number,
            required: true
        },
        carbohydrates: Number,
        proteins: Number
    }
});


const weeklySchema = mongoose.Schema({
    totalPlannedCalories: {
        type: Number,
        required: true
    },
    totalPlannedCarbs: Number,
    totalPlannedProtein: Number
});


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