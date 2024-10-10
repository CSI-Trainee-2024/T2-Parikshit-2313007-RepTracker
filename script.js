let itemsArray;

try {
  itemsArray = JSON.parse(localStorage.getItem("workoutEntries")) || [];
} catch (error) {
  itemsArray = [];
}

function displayEntry() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `<li class="tableRow">
                <div class="col col-1">${itemsArray[i].workout} -- X${itemsArray[i].reps}</div>
                <div class="col col-3">${itemsArray[i].time}</div>
                <button class="col col-4 deleteBtn">X</button>
            </li>`;
  }
  document.querySelector(".table").innerHTML = items;
  deleteEntry();
}

function deleteEntry() {
  let deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let i = btn.getAttribute("i");
      deleteItem(i);
    });
  });
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("workoutEntries", JSON.stringify(itemsArray));
  displayEntry();
}

function addEntry() {
  let workout = document.getElementById("workout");
  let timeLimit = document.getElementById("timeLimit");
  let reps = document.getElementById("reps");
  data = {
    workout: `${workout.value}`,
    time: `${timeLimit.value}`,
    reps: `${reps.value}`,
  };

  itemsArray.push(data);
  localStorage.setItem("workoutEntries", JSON.stringify(itemsArray));
  console.log(itemsArray);
  displayEntry();
}

function addToList() {
  addEntry();
}

addWorkout.addEventListener("click", addToList);

window.onload = function () {
  displayEntry();
};
