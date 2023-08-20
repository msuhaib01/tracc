class CalorieTracker {
  constructor() {
    this._calorieGoal = 500;
    this._restingCalBurnRate = -2000;
    this._totalCalories = 0;
    this._totalCalConsumed = 0;
    this._totalCalBurned = 0;
    console.log(this._restingCalBurnRate);
    this._calRemaining =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    console.log(this._calRemaining);

    this._meals = [];
    this._workouts = [];
    this._render();
  }
  // public methods
  reset() {
    this._calorieGoal = 500;
    this._restingCalBurnRate = -2000;
    this._totalCalories = 0;
    this._totalCalConsumed = 0;
    this._totalCalBurned = 0;
    console.log(this._restingCalBurnRate);
    this._calRemaining =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    console.log(this._calRemaining);

    this._meals = [];
    this._workouts = [];
    this._render();
  }
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._totalCalConsumed += meal.calories;
    this._calRemaining =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    this._updateDomMeal();
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._totalCalBurned += workout.calories;
    this._calRemaining =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    this._updateDomWorkout();
    this._render();
  }

  removeWorkout(li, workoutObj) {
    this._removeDomWorkout(li);
    this._removeFromListWorkout(workoutObj);
    this._recalculateWorkout(workoutObj);
  }
  removeMeal(li, mealObj) {
    this._removeDomWorkout(li);
    this._removeFromListMeal(mealObj);
    this._recalculateMeal(mealObj);
  }
  // private methods
  _recalculateMeal(mealObj) {
    this._totalCalories -= mealObj.calories;
    this._totalCalConsumed -= mealObj.calories;
    this._calRemaining =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    this._render();
  }
  _removeFromListMeal(mealObj) {
    this._meals.splice(mealObj, 1);
  }
  _recalculateWorkout(workoutObj) {
    console.log(workoutObj);
    this._totalCalories += workoutObj.calories;
    this._totalCalBurned -= workoutObj.calories;
    this._calRemaining =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    this._render();
  }
  _removeFromListWorkout(workoutObj) {
    this._workouts.splice(workoutObj, 1);
  }
  _removeDomWorkout(li) {
    li.remove();
  }
  _updateDomMeal() {
    const mealList = document.querySelector(".list-food");
    mealList.innerHTML = "";
    this._meals.forEach((meal) => {
      console.log(meal);
      const li = document.createElement("li");
      li.classList.add("list-element");
      li.classList.add("list-food");
      li.setAttribute("data-id", meal.id);
      li.innerHTML = `
      <p class="list-element-p">${meal.name}</p>
      <div class="list-element-left-side">
        <div class="list-element-number food-number">${meal.calories}</div>
        <button class="btn-remove">X</button>
      </div>
      `;
      mealList.appendChild(li);
    });
  }
  _updateDomWorkout() {
    const workoutList = document.querySelector(".list-workout");
    workoutList.innerHTML = "";
    this._workouts.forEach((workout) => {
      console.log(workout);
      const li = document.createElement("li");
      li.classList.add("list-element");
      li.classList.add("list-food");
      li.setAttribute("data-id", workout.id);
      li.innerHTML = `
      <p class="list-element-p">${workout.name}</p>
      <div class="list-element-left-side">
        <div class="list-element-number food-number">${workout.calories}</div>
        <button class="btn-remove">X</button>
      </div>
      `;
      workoutList.appendChild(li);
    });
  }

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
    calBurned.textContent =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
  }
  _displayProgressBar() {
    const leftSide = document.querySelector(".base-left-color");
    const rightSide = document.querySelector(".base-right-color");
    this._calRemaining =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;

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
