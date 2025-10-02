// document.addEventListener for DOMContentLoaded ensures code runs after HTML loads
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage and render them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  // Create the addTask function with Local Storage support
  function addTask(taskTextArg, save = true) {
    // Retrieve and trim the task input value or use provided text
    const taskText =
      typeof taskTextArg === "string" ? taskTextArg : taskInput.value.trim();

    // Validate input; alert if empty
    if (taskText === "") {
      alert("Please enter a task");
      return;
    }

    // Create task <li> element with text
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create a Remove button and attach click handler
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = function () {
      // Remove the task <li> from the list
      taskList.removeChild(li);

      // Update Local Storage after removal
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const index = storedTasks.indexOf(taskText);
      if (index > -1) {
        storedTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      }
    };

    // Append remove button to the <li>, then add <li> to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";

    // Save to Local Storage when adding
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  // Attach event listeners
  addButton.addEventListener("click", function () {
    addTask();
  });
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Initialize from Local Storage on DOMContentLoaded
  loadTasks();
});
