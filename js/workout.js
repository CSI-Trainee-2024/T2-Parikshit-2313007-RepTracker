let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let workoutLog = JSON.parse(localStorage.getItem("workoutLog")) || [];
let currentWorkoutIndex = 0;
let workoutInterval;
let restTime = 5; // rest between exercises
let currentTime = 0;

const currentExercise = document.getElementById("currentExercise");
const timerDisplay = document.getElementById("timer");
const endExerciseBtn = document.getElementById("endExerciseBtn");

window.onload = () => {
  if (workouts.length > 0) {
    startCountdown(5, startExercise); // 10-second countdown before starting
  } else {
    alert("No workouts found! Please add exercises first.");
    window.location.href = "index.html";
  }
};

function startCountdown(seconds, callback) {
  currentTime = seconds;
  updateTimerDisplay();

  workoutInterval = setInterval(() => {
    currentTime--;
    updateTimerDisplay();
    if (currentTime <= 0) {
      clearInterval(workoutInterval);
      callback();
    }
  }, 1000);
}

function startExercise() {
  if (currentWorkoutIndex < workouts.length) {
    const workout = workouts[currentWorkoutIndex];
    // console.log(workout);
    currentExercise.textContent = `Current Exercise: ${workout.name} -- X${workout.reps}`;
    currentTime = workout.duration;
    updateTimerDisplay();
    endExerciseBtn.disabled = false;

    workoutInterval = setInterval(() => {
      currentTime--;
      updateTimerDisplay();
      if (currentTime <= 0) {
        clearInterval(workoutInterval);
        logExercise(workout.name, workout.duration);
        currentWorkoutIndex++;
        startRest();
      }
    }, 1000);
  } else {
    endWorkout();
  }
}

function startRest() {
  if (currentWorkoutIndex < workouts.length) {
    currentExercise.textContent = `Resting Time...`;
    startCountdown(restTime, startExercise);
  }
}

endExerciseBtn.addEventListener("click", () => {
  if (currentWorkoutIndex < workouts.length) {
    clearInterval(workoutInterval);
    const workout = workouts[currentWorkoutIndex];
    logExercise(workout.name, workout.duration - currentTime);
    currentWorkoutIndex++;
    startRest();
  } else {
    endWorkout();
  }
});

function logExercise(name, completedTime) {
  workoutLog.push({ name, completedTime });
  localStorage.setItem("workoutLog", JSON.stringify(workoutLog));
}

function endWorkout() {
  currentExercise.textContent = "Workout Complete!";
  timerDisplay.textContent = "0";
  endExerciseBtn.disabled = true;
  window.location.href = "log.html";
}

function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  timerDisplay.textContent = `${minutes}:${formattedSeconds}`;
}
document.getElementById("quitExercise").addEventListener("click", () => {
  window.location.href = "index.html";
  localStorage.removeItem("workoutLog");
});
