// Grocery items can be added to a grocery list

const form = document.getElementById("input-form");
const itemInput = document.getElementById("input-value");
const feedback = document.querySelector(".feedback");
const itemsList = document.querySelector(".list-items");
const clearButton = document.querySelector(".clearBtn");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (itemInput.value === "") {
		// show an error if the input is missing
		showFeedback("please enter a valid item", "alert-danger");
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
			showFeedback("the item is added to the list", "alert-success");
		} else {
			// show a message if the input is identical
			showFeedback("the item already exists", "alert-warning");
		}

		// clear the input
		itemInput.value = "";
	}
});

const createParagraph = (text) => {
	const paragraph = document.createElement("p");
	paragraph.textContent = text;
	feedback.appendChild(paragraph);
};

// create a feedback
const showFeedback = (text, alert) => {
	// empty the feedback before rendering the new one
	feedback.textContent = "";

	createParagraph(text);
	feedback.classList.add("showItem", alert);

	// hide the feedback
	setTimeout(() => {
		feedback.classList.remove("showItem", alert);
	}, 2000);
};

// save items to localStorage
const saveItems = (groceryList) => {
	localStorage.setItem("items", JSON.stringify(groceryList));
};

// fetch existing items from localStorage
const getSavedItems = () => {
	const itemsJSON = localStorage.getItem("items");

	// validate the data if it is JSON
	try {
		return itemsJSON ? JSON.parse(itemsJSON) : [];
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
			`<div class="item my-3 d-flex justify-content-between p-2" >
    <h4 class="item-title text-capitalize">${groceryItem}</h4>
    <span onclick="deleteItem('${groceryItem}')" class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
    </div>`
		);
	});	
};

// read and parse the groceryList when the app starts
let groceryList = getSavedItems();
// render the saved items
displayItems(groceryList);

// delete an item from the groceryList
const deleteItem = (item) => {	
	// compare the item from the UI with groceryItem from groceryList
	const itemIndex = groceryList.findIndex(
		(groceryItem) => item === groceryItem
	);

	if (itemIndex > -1) {
		groceryList.splice(itemIndex, 1);
		// render the groceryList
		displayItems(groceryList);
		// save the items to localStorage
		saveItems(groceryList);
	}
};

// clear the localStorage, empty the groceryList, clear the UI
clearButton.addEventListener("click", () => {
	localStorage.clear();
	groceryList = [];
	itemsList.innerHTML = "";
});
