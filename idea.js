function WorkoutTracker(root) {
  const LOCAL_STORAGE_DATA_KEY = "workout-tracker-entries";
  let entries = [];

  function init() {
    root.insertAdjacentHTML("afterbegin", html());
    loadEntries();
    updateView();

    root.querySelector(".tracker__add").addEventListener("click", () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      addEntry({
        date: `${year}-${month}-${day}`,
        workout: "walking",
        duration: 30,
      });
    });
  }

  function html() {
    return `
            <table class="tracker">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Workout</th>
                        <th>Duration</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="tracker__entries"></tbody>
                <tbody>
                    <tr class="tracker__row tracker__row--add">
                        <td colspan="4">
                            <span class="tracker__add">Add Entry &plus;</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
  }

  function rowHtml() {
    return `
            <tr class="tracker__row">
                <td>
                    <input type="date" class="tracker__date">
                </td>
                <td>
                    <select class="tracker__workout">
                        <option value="walking">Walking</option>
                        <option value="running">Running</option>
                        <option value="outdoor-cycling">Outdoor Cycling</option>
                        <option value="indoor-cycling">Indoor Cycling</option>
                        <option value="swimming">Swimming</option>
                        <option value="yoga">Yoga</option>
                    </select>
                </td>
                <td>
                    <input type="number" class="tracker__duration">
                    <span class="tracker__text">minutes</span>
                </td>
                <td>
                    <button type="button" class="tracker__button tracker__delete">&times;</button>
                </td>
            </tr>
        `;
  }

  function loadEntries() {
    entries = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY) || "[]");
  }

  function saveEntries() {
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(entries));
  }

  function updateView() {
    const tableBody = root.querySelector(".tracker__entries");

    // Clear the table
    tableBody.querySelectorAll(".tracker__row").forEach((row) => {
      row.remove();
    });

    // Add a row for each entry
    entries.forEach((data) => addRow(data));
  }

  function addRow(data) {
    const template = document.createElement("template");
    let row = null;

    template.innerHTML = rowHtml().trim();
    row = template.content.firstElementChild;

    row.querySelector(".tracker__date").value = data.date;
    row.querySelector(".tracker__workout").value = data.workout;
    row.querySelector(".tracker__duration").value = data.duration;

    row
      .querySelector(".tracker__date")
      .addEventListener("change", ({ target }) => {
        data.date = target.value;
        saveEntries();
      });

    row
      .querySelector(".tracker__workout")
      .addEventListener("change", ({ target }) => {
        data.workout = target.value;
        saveEntries();
      });

    row
      .querySelector(".tracker__duration")
      .addEventListener("change", ({ target }) => {
        data.duration = target.value;
        saveEntries();
      });

    row.querySelector(".tracker__delete").addEventListener("click", () => {
      deleteEntry(data);
    });

    tableBody.appendChild(row);
  }

  function addEntry(data) {
    entries.push(data);
    saveEntries();
    updateView();
  }

  function deleteEntry(dataToDelete) {
    entries = entries.filter((data) => data !== dataToDelete);
    saveEntries();
    updateView();
  }

  init();

  return {
    addEntry,
    deleteEntry,
  };
}

const app = document.getElementById("app");
const wt = WorkoutTracker(app);

window.wt = wt;
