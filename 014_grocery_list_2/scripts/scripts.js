// Grocery items can be created then added to a grocery list

const itemAlert = document.querySelector(".addItems-action");
const itemInput = document.querySelector(".addItems-input");
const submitItem = document.querySelector(".addItems-submit");

const listAlert = document.querySelector(".displayItems-action");
const itemsList = document.querySelector(".grocery-list");
const clearItems = document.querySelector(".displayItems-clear");

submitItem.addEventListener("click", (e) => {
	e.preventDefault();

	if (itemInput.value === "") {
		// show an error if the input is missing
		showAlert(itemAlert, "please enter a grocery item", "alert");
	} else {
		const item = itemInput.value.trim().toLowerCase();

		if (groceryList === [] || groceryList.indexOf(item) === -1) {
			// create a new item and send to the end of groceryList
			groceryList.push(item);

			// render the groceryList
			displayItems(groceryList);

			// save the items to localStorage
			saveItems(groceryList);

			// show a success message
			showAlert(itemAlert, `${item} is added to the list`, "success");
		} else {
			// show a message if the input is identical
			showAlert(itemAlert, `${item} already exists`, "warning");
		}

		// clear the input
		itemInput.value = "";
	}
});

// create an alert
const showAlert = (alertType, text, alertClass) => {
	// empty the alert before rendering the new one
	alertType.textContent = "";

	alertType.textContent = text;
	alertType.classList.add(alertClass);

	// hide the alert
	setTimeout(() => {
		alertType.classList.remove(alertClass);
	}, 2000);
};

// save items to localStorage
const saveItems = (groceryList) => {
	localStorage.setItem("grocery-list", JSON.stringify(groceryList));
};

// fetch existing items from localStorage
const getSavedItems = () => {
	const listJSON = localStorage.getItem("grocery-list");

	// validate the data if it is JSON
	try {
		return listJSON ? JSON.parse(listJSON) : [];
	} catch {
		return [];
	}
};

// render the groceryList
const displayItems = (groceryList) => {
	// clear (the comment and) the itemsList before rendering anything
	itemsList.innerHTML = "";

	groceryList.forEach((groceryItem) => {
		// insert an HTML element inside itemsList
		itemsList.insertAdjacentHTML(
			"beforeend",
			`<div class="grocery-item">
	   <h4 class="grocery-item__title text-capitalize">${groceryItem}</h4>
	   <a href="#" class="grocery-item__link">
	     <i class="far fa-trash-alt"></i>
	   </a>
	 </div>`
		);
	});
};

// read and parse the groceryList when the app starts
let groceryList = getSavedItems();
// render the saved items
displayItems(groceryList);

// delete an item from the groceryList - add the eventListener to the PARENT -
itemsList.addEventListener("click", (e) => {
	const deleteIcon = e.target.parentElement;

	if (deleteIcon.classList.contains("grocery-item__link")) {
		const item = deleteIcon.previousElementSibling.textContent;

		deleteItem(item);
	}
});

const deleteItem = (item) => {
	// find the specific item in the groceryList and remove it
	groceryList.map((groceryItem) => {
		if (item === groceryItem) {
			groceryList.splice(groceryItem, 1);
		}
	});

	// render the groceryList
	displayItems(groceryList);

	// save the items to localStorage
	saveItems(groceryList);

	// show a success removed message
	showAlert(listAlert, `${item} is removed from the list`, "success");
};

// clear the localStorage, empty the groceryList, clear the UI
clearItems.addEventListener("click", () => {
	if (groceryList.length > 0) {
		localStorage.clear();
		groceryList = [];
		itemsList.innerHTML = "";

		// show a success removed message
		showAlert(listAlert, "all items are removed", "success");
	} else {
		// show an alert message
		showAlert(listAlert, "no more items to remove", "alert");
	}
});
