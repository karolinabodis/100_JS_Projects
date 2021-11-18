// Daily tasks and activities can be created and listed in a to do list

const form = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.querySelector(".item-list");
const errorMessage = document.querySelector(".feedback");
const clearButton = document.getElementById("clear-list");

// generate an unique id to keep track of tasks
const uid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// keep track of editing
let editingIndex = -1;

const saveTasks = (taskList) => {
	// save tasks to localStorage - convert to String
	localStorage.setItem("tasks", JSON.stringify(taskList));
};

const getSavedTasks = () => {
	// fetch existing tasks from localStorage
	const tasksJSON = localStorage.getItem("tasks");

	// validate the data if it is JSON - convert to Array back
	try {
		return tasksJSON ? JSON.parse(tasksJSON) : [];
	} catch {
		return [];
	}
};

const displayTasks = (taskList) => {
	// clear (the comment and) the itemList before rendering anything
	itemList.innerHTML = "";

	taskList.forEach((task) => {
		// insert an HTML element inside itemList
		// element.insertAdjacentHTML(position, text);
		itemList.insertAdjacentHTML(
			"beforeend",
			`<div class="item my-3" id="${task.id}">
			<h3 class="item-name text-capitalize ${task.completed ? "completed" : ""}">${
				task.task
			}
			  </h3>
				  <div class="item-icons">
						<a href="#" class="complete-item item-icon ${
							task.completed ? "visibility" : ""
						}"><i class="far fa-check-circle"></i></a>
						<a href="#" class="edit-item  item-icon"><i class="far fa-edit"></i></a>
						<a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
					</div>
			</div>`
		);
	});
};

// read and parse the data when the app starts
let taskList = getSavedTasks();
// render the saved tasks
displayTasks(taskList);

clearButton.addEventListener("click", () => {
	// clear the localStorage, empty the taskList, clear the UI
	localStorage.clear();
	taskList = [];
	itemList.innerHTML = "";
});

const showError = () => {
	errorMessage.textContent = "please enter a valid task";
	errorMessage.classList.add("showItem", "alert-danger");
};

const hideError = () => {
	setTimeout(() => {
		errorMessage.classList.remove("showItem", "alert-danger");
	}, 3000);
};

window.addEventListener("click", (e) => {
	// fetch the task id from the UI
	const taskId =
		e.target.parentElement.parentElement.parentElement.getAttribute("id");
	// fetch the icon in order to choose to right one
	const icon = e.target.parentElement;

	// compare the id from the UI with task.id from taskList
	const taskIndex = taskList.findIndex((task) => task.id === taskId);

	if (icon.classList.contains("complete-item")) {
		if (taskIndex > -1) {
			taskList[taskIndex].completed = !taskList[taskIndex].completed;

			// save the new task list
			saveTasks(taskList);
			// render the new task list
			displayTasks(taskList);
		}
	}

	if (icon.classList.contains("edit-item")) {
		if (taskIndex > -1) {
			editingIndex = taskIndex;

			itemInput.value = taskList[taskIndex].task;
		}
	}

	if (icon.classList.contains("delete-item")) {
		if (taskIndex > -1) {
			taskList.splice(taskIndex, 1);
			// save the new task list
			saveTasks(taskList);
			// render the new task list
			displayTasks(taskList);
		}
	}
});

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (itemInput.value === "") {
		// show an error if the input is missing
		showError();
		hideError();
	} else {
		const task = itemInput.value.trim();

		if (editingIndex > -1) {
			// edit an existing task
			taskList[editingIndex].task = itemInput.value;
			editingIndex = -1;
		} else {
			// create a new task and send to the end of taskList
			taskList.push({
				id: uid(),
				// = task: task (ES6 shorthand: propery name, using the value from the variable in the scope)
				task,
				completed: false,
			});
		}

		// clear the input
		itemInput.value = "";

		// render the taskList
		displayTasks(taskList);
		// save to localStorage
		saveTasks(taskList);
	}
});
