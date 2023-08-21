import Storage from "./Storage";

class CalorieTracker {
  constructor() {
    this._calorieGoal = Storage.getCalorieGoal();
    this._restingCalBurnRate = Storage.getRestingBurnRate();
    this._totalCalories = 0;
    this._totalCalConsumed = 0;
    this._totalCalBurned = 0;
    console.log(this._restingCalBurnRate);
    this._calRemaining =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    console.log(this._calRemaining);

    this._meals = Storage.getMeals();
    this._updateDomMeal();
    this._workouts = Storage.getWorkouts();
    this._updateDataFromArr();
    this._render();
  }
  //
  _updateDataFromArr() {
    this._meals.forEach((meal) => {
      this._totalCalories += meal.calories;
      this._totalCalConsumed += meal.calories;
      this._calRemaining =
        -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    });
    this._workouts.forEach((workout) => {
      this._totalCalories -= workout.calories;
      this._totalCalBurned += workout.calories;
      this._calRemaining =
        -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    });
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
    document.querySelector(".list-workout").innerHTML = "";
    document.querySelector(".list-food").innerHTML = "";

    // storage reset
    Storage.setCalorieGoal(500);
    Storage.setRestingBurnRate(-2000);
    Storage.setMeals(this._meals);
    Storage.setWorkouts(this._workouts);
  }
  addMeal(meal) {
    this._meals.push(meal);
    Storage.setMeals(this._meals);

    this._totalCalories += meal.calories;
    this._totalCalConsumed += meal.calories;
    this._calRemaining =
      -this._calorieGoal + this._totalCalories + this._restingCalBurnRate;
    this._updateDomMeal();
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    Storage.setWorkouts(this._workouts);

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
    Storage.setMeals(this._meals);
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
    Storage.setWorkouts(this._workouts);
  }
  _removeDomWorkout(li) {
    li.remove();
  }
  _updateDomMeal() {
    console.log("BANG", this._meals);
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
    this._updateDomMeal();
    this._updateDomWorkout();
  }
}

export default CalorieTracker;
