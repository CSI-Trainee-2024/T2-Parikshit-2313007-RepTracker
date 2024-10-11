// workout.js

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let workoutLog = JSON.parse(localStorage.getItem("workoutLog")) || [];
let currentWorkoutIndex = 0;
let workoutInterval;
let restTime = 5; // 10 seconds rest between exercises
let currentTime = 0;

const currentExercise = document.getElementById("currentExercise");
const timerDisplay = document.getElementById("timer");
const endExerciseBtn = document.getElementById("endExerciseBtn");

// Start the workout when the page loads
window.onload = () => {
  if (workouts.length > 0) {
    startCountdown(5, startExercise); // 10-second countdown before starting
  } else {
    alert("No workouts found! Please add exercises first.");
    window.location.href = "index.html"; // Redirect back to the add exercise page
  }
};

// Start countdown timer
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

// Start the next exercise
function startExercise() {
  if (currentWorkoutIndex < workouts.length) {
    const workout = workouts[currentWorkoutIndex];
    console.log(workout);
    currentExercise.textContent = `Current Exercise: ${workout.name}`;
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

// Start rest period
function startRest() {
  if (currentWorkoutIndex < workouts.length) {
    currentExercise.textContent = `Resting...`;
    startCountdown(restTime, startExercise);
  }
}

// End exercise early
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

// Log the exercise completion
function logExercise(name, completedTime) {
  workoutLog.push({ name, completedTime });
  localStorage.setItem("workoutLog", JSON.stringify(workoutLog));
}

// End the workout
function endWorkout() {
  currentExercise.textContent = "Workout Complete!";
  timerDisplay.textContent = "Timer: 0s";
  endExerciseBtn.disabled = true;
  window.location.href = "log.html"; // Redirect to the workout log page
}

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  timerDisplay.textContent = `Timer: ${minutes}:${formattedSeconds}`;
}
