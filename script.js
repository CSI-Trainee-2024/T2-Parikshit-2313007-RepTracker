let addWorkout = document.getElementById("addWorkout");
let workout = document.getElementById("workout");
let timeLimit = document.getElementById("timeLimit");
let ul = document.querySelector("ul");

const val = () => {
  console.log(workout.value);
  console.log(timeLimit.value);
  let li = document.createElement("li");
  li.innerText = workout.value;
  ul.appendChild(li);
  workout.value = "";
};

addWorkout.addEventListener("click", val);
