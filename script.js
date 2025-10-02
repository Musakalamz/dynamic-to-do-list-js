// document.addEventListener for DOMContentLoaded ensures code runs after HTML loads
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Create the addTask function
  function addTask() {
    // Retrieve and trim the task input value
    const taskText = taskInput.value.trim();

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
    };

    // Append remove button to the <li>, then add <li> to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
  }

  // Attach event listeners
  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Invoke the addTask function on DOMContentLoaded (per instructions)
  addTask();
});
