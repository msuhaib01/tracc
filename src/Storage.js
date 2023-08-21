class Storage {
  static getCalorieGoal() {
    const defaultGoal = 500;
    let calorieGoal;
    if (localStorage.getItem("calorieGoal") === null) {
      calorieGoal = defaultGoal;
    } else {
      calorieGoal = +localStorage.getItem("calorieGoal");
    }
    return calorieGoal;
  }
  static setCalorieGoal(calorieGoal) {
    localStorage.setItem("calorieGoal", calorieGoal);
  }
  static getRestingBurnRate() {
    const defaultRestingBurnRate = -2000;
    let restingBurnRate;
    if (localStorage.getItem("restingBurnRate") === null) {
      restingBurnRate = defaultRestingBurnRate;
    } else {
      restingBurnRate = +localStorage.getItem("restingBurnRate");
    }
    return restingBurnRate;
  }
  static setRestingBurnRate(restingBurnRate) {
    localStorage.setItem("restingBurnRate", restingBurnRate);
  }
  static getMeals() {
    const defaultMealsArr = [];
    let mealsArr;
    if (localStorage.getItem("mealsArr") === null) {
      mealsArr = defaultMealsArr;
      console.log("FALSENULL");
    } else {
      mealsArr = JSON.parse(localStorage.getItem("mealsArr"));
    }
    return mealsArr;
  }
  static setMeals(mealsArr) {
    localStorage.setItem("mealsArr", JSON.stringify(mealsArr));
  }
  static getWorkouts() {
    const defaultWorkoutsArr = [];
    let workoutsArr;
    if (localStorage.getItem("workoutsArr") === null) {
      workoutsArr = defaultWorkoutsArr;
      console.log("FALSENULL");
    } else {
      workoutsArr = JSON.parse(localStorage.getItem("workoutsArr"));
    }
    return workoutsArr;
  }
  static setWorkouts(workoutsArr) {
    localStorage.setItem("workoutsArr", JSON.stringify(workoutsArr));
  }
}

export default Storage;
