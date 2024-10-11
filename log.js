// log.js

let workoutLog = JSON.parse(localStorage.getItem("workoutLog")) || [];
const workoutLogList = document.getElementById("workoutLog");

// Display the workout log
function updateWorkoutLog() {
  workoutLogList.innerHTML = ""; // Clear existing log
  workoutLog.forEach((log, index) => {
    const minutes = Math.floor(log.completedTime / 60);
    const seconds = log.completedTime % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedTime = `${minutes}:${formattedSeconds}`;
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${
      log.name
    } - Completed in ${formattedTime}`;
    workoutLogList.appendChild(li);
  });
}

document.getElementById("goBackBtn").addEventListener("click", () => {
  window.location.href = "index.html"; // Redirect to the add exercise page
});

// Update the workout log when the page loads
window.onload = updateWorkoutLog;
``;
