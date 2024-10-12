let workoutLog = JSON.parse(localStorage.getItem("workoutLog")) || [];
const workoutLogList = document.getElementById("workoutLog");

function updateWorkoutLog() {
  const workoutLogList = document.querySelector("#workoutLog");
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  workoutLog.forEach((log, index) => {
    const compTime = formatTime(log.completedTime);
    const planTime = formatTime(workouts[index].duration);

    const li = `
          <li class="tableRow">
              <div class="col col-1">${index + 1}</div>
              <div class="col col-2">${log.name}</div>
              <div class="col col-3">${planTime}</div>
              <div class="col col-4">${compTime}</div>
          </li>
      `;
    workoutLogList.innerHTML += li;
  });
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${formattedSeconds}`;
}

function formatTime(unFormatedTime) {
  const minutes = Math.floor(unFormatedTime / 60);
  const seconds = unFormatedTime % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedDuration = `${minutes}:${formattedSeconds}`;
  return formattedDuration;
}

document.getElementById("goBackBtn").addEventListener("click", () => {
  window.location.href = "index.html";
  localStorage.removeItem("workoutLog");
});

document.getElementById("restartBtn").addEventListener("click", () => {
  window.location.href = "index.html";
  localStorage.removeItem("workoutLog");
  localStorage.removeItem("workouts");
});

window.onload = updateWorkoutLog;
``;
