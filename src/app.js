import "./css/style.css";
import CalorieTracker from "./tracker";
import { Meal, Workout } from "./item";
import Storage from "./Storage";

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .querySelector(".inputs-meals-form")
      .addEventListener("submit", this._newMeal.bind(this));
    document
      .querySelector(".inputs-workout-form")
      .addEventListener("submit", this._newWorkout.bind(this));
    document
      .querySelector(".settings-form.goal")
      .addEventListener("submit", this._setGoal.bind(this));
    document
      .querySelector(".settings-form.rate")
      .addEventListener("submit", this._setRate.bind(this));
    document
      .querySelector(".list-workout")
      .addEventListener("click", this._deleteWorkout.bind(this));
    document
      .querySelector(".list-food")
      .addEventListener("click", this._deleteMeal.bind(this));
    document
      .querySelector(".btn-cal-daily-goal")
      .addEventListener("click", this._toggleSettings);
    document
      .querySelector(".reset-day")
      .addEventListener("click", this._reset.bind(this));
  }
  _reset() {
    console.log("BANG");
    this._tracker.reset();
  }
  _setGoal(e) {
    e.preventDefault();
    const goalInput = document.querySelector(".settings-input.goal");
    const goalInteger = +goalInput.value;
    if (Number.isNaN(goalInteger)) {
      alert("Please Enter Number");
      return;
    }
    this._tracker._calorieGoal = goalInteger;
    Storage.setCalorieGoal(goalInteger);
    this._tracker._render();
    console.log("goal");
  }
  _setRate(e) {
    e.preventDefault();
    const rateInput = document.querySelector(".settings-input.rate");
    const rateInteger = +rateInput.value;
    if (Number.isNaN(rateInteger)) {
      alert("Please Enter Number");
      return;
    }
    this._tracker._restingCalBurnRate = rateInteger;
    Storage.setRestingBurnRate(rateInteger);

    this._tracker._render();

    console.log("rate");
  }
  _toggleSettings() {
    const settingsContainer = document.querySelector(".settings-container");
    settingsContainer.classList.toggle("show");
  }
  _deleteMeal(e) {
    if (e.target.classList.contains("btn-remove")) {
      const liToBeNuked = e.target.parentNode.parentNode;
      const id = liToBeNuked.dataset.id;
      let obj;
      for (const meal of this._tracker._meals) {
        if (meal.id == id) {
          obj = meal;
        }
      }
      this._tracker.removeMeal(liToBeNuked, obj);
    }
  }
  _deleteWorkout(e) {
    console.log(e.target);
    if (e.target.classList.contains("btn-remove")) {
      const liToBeNuked = e.target.parentNode.parentNode;
      const id = liToBeNuked.dataset.id;
      let obj;
      for (const workout of this._tracker._workouts) {
        if (workout.id == id) {
          obj = workout;
        }
      }
      this._tracker.removeWorkout(liToBeNuked, obj);

      //remove from local storage
    }
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
