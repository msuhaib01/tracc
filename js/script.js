class CalorieTracker {
  constructor() {
    this._calorieGoal = 500;
    this._restingCalBurnRate = -2000;
    this._totalCalories = this._restingCalBurnRate;
    this._totalCalConsumed = 0;
    this._totalCalBurned = 0;
    this._calRemaining = -this._calorieGoal + this._totalCalories;

    this._meals = [];
    this._workouts = [];
    this._render();
  }
  // public methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._totalCalConsumed += meal.calories;
    this._calRemaining = -this._calorieGoal + this._totalCalories;

    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._totalCalBurned += workout.calories;
    this._calRemaining = -this._calorieGoal + this._totalCalories;

    this._render();
  }
  // private methods
  _displayCaloriesTotal() {
    const totalCalEl = document.querySelector(".gain-loss h2");
    totalCalEl.textContent = this._totalCalories;
  }
  _displayCaloriesGoal() {
    const calGoalEl = document.querySelector(".cal-goal h2");
    calGoalEl.textContent = this._calorieGoal;
  }
  _displayCaloriesConsumed() {
    const calConsumed = document.querySelector(".cal-eaten h2");
    calConsumed.textContent = this._totalCalConsumed;
  }
  _displayCaloriesBurned() {
    const calBurned = document.querySelector(".cal-burned h2");
    calBurned.textContent = this._totalCalBurned;
  }
  _displayCaloriesRemaining() {
    const calBurned = document.querySelector(".cal-remaining h2");
    calBurned.textContent = -this._calorieGoal + this._totalCalories;
  }
  _displayProgressBar() {
    const leftSide = document.querySelector(".base-left-color");
    const rightSide = document.querySelector(".base-right-color");
    if (this._calRemaining <= 0) {
      rightSide.style.width = "0";
      let perc = Math.trunc((-this._calRemaining / 4000) * 100);

      console.log(perc, typeof perc);
      leftSide.style.width = `${perc}%`;
    } else {
      leftSide.style.width = "0";
      let perc = Math.trunc((this._calRemaining / 4000) * 100);

      console.log(perc, typeof perc);
      rightSide.style.width = `${perc}%`;
    }
  }
  _update() {}
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesGoal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayProgressBar();
  }
}
class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}
class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .querySelector(".inputs-meals-form")
      .addEventListener("submit", this._newMeal.bind(this));
    document
      .querySelector(".inputs-workout-form")
      .addEventListener("submit", this._newWorkout.bind(this));
  }
  _newWorkout(e) {
    e.preventDefault();
    const workoutInput = document.querySelector("#workout-input");
    const calInput = document.querySelector("#workout-cal-input");
    const workOutString = workoutInput.value;

    const caloriesInputInteger = parseInt(calInput.value);
    if (Number.isNaN(caloriesInputInteger)) {
      alert("Please Enter Number");
      return;
    } else if (workOutString.length == 0) {
      alert("Please Enter a workout");
      return;
    }
    const workout = new Workout(workOutString, caloriesInputInteger);

    this._tracker.addWorkout(workout);
    workoutInput.value = "";
    calInput.value = "";
    calInput.blur();
  }

  _newMeal(e) {
    e.preventDefault();
    const mealInput = document.querySelector("#food-input");
    const calInput = document.querySelector("#food-cal-input");
    const mealString = mealInput.value;
    console.log(mealInput, calInput);
    const caloriesInputInteger = parseInt(calInput.value);
    if (Number.isNaN(caloriesInputInteger)) {
      alert("Please Enter Number");
      return;
    } else if (mealString.length == 0) {
      alert("Please Enter a meal");
      return;
    }
    const meal = new Meal(mealString, caloriesInputInteger);

    this._tracker.addMeal(meal);
    mealInput.value = "";
    calInput.value = "";
    calInput.blur();
  }
}

const app = new App();
