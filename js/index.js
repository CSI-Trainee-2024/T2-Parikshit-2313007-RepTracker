let addWorkoutBtn = document.querySelector("#addWorkoutBtn");

let workouts;

try {
  workouts = JSON.parse(localStorage.getItem("workouts")) || [];
} catch (error) {
  workouts = [];
}

function formatTime(unFormatedTime) {
  const minutes = Math.floor(unFormatedTime / 60);
  const seconds = unFormatedTime % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedDuration = `${minutes}:${formattedSeconds}`;
  return formattedDuration;
}

function displayEntry() {
  let items = "";
  for (let i = 0; i < workouts.length; i++) {
    items += `<li class="tableRow">
                <div class="col col-1">${workouts[i].name} -- X${
      workouts[i].reps
    }</div>
                <div class="col col-3">${formatTime(workouts[i].duration)}</div>
                <button class="col col-4 deleteBtn" data-index="${i}">X</button>
            </li>`;
  }
  document.querySelector(".table").innerHTML = items;
  deleteEntry();
}

function deleteEntry() {
  let deleteBtns = document.querySelectorAll(".deleteBtn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let i = parseInt(btn.getAttribute("data-index"));
      deleteItem(i);
    });
  });
}

function deleteItem(i) {
  workouts.splice(i, 1);
  localStorage.setItem("workouts", JSON.stringify(workouts));
  displayEntry();
}

function parseTime(duration) {
  const parts = duration.split(":");
  const minutes = parseInt(parts[0]) || 0;
  const seconds = parseInt(parts[1]) || 0;
  return minutes * 60 + seconds;
}

function addEntry() {
  let workout = document.getElementById("workout");
  let timeLimit = document.getElementById("timeLimit");
  let reps = document.getElementById("reps");
  let timeDuration = parseTime(timeLimit.value);
  data = {
    name: `${workout.value}`,
    duration: `${timeDuration}`,
    reps: `${reps.value}`,
  };
  if (workout.value && timeLimit.value && reps.value) {
    workouts.push(data);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    displayEntry();
  } else {
    alert("Please enter a valid exercise name and duration.");
  }
}

addWorkoutBtn.addEventListener("click", addEntry);

document.querySelector("#startWorkoutBtn").addEventListener("click", () => {
  if (workouts.length > 0) {
    window.location.href = "workout.html";
  } else {
    alert("Please add at least one exercise.");
  }
});

window.onload = function () {
  displayEntry();
};
