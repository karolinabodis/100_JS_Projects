// A flashcard can be generated from the user-defined question and answer with Object Oriented JavaScript

const addButton = document.getElementById("show-btn");

const questionCard = addButton.nextElementSibling;
const closeButton = questionCard.firstElementChild;
const feedback = closeButton.nextElementSibling;
const form = document.getElementById("question-form");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const questionsList = document.getElementById("questions-list");

// read and parse the cardList when the app starts
let cardList = getSavedCards();

// keep track of editing (-1: no editing)
let editingIndex = -1;

// keep track of ids
function getId() {
	let id = 0;
	// check if contains a card and is not in editing mode
	if (cardList.length > 0 && editingIndex === -1) {
		cardList.forEach((card) => {
			// find the max id card in cardList then increase it
			if (card.id > id) {
				id = card.id;
			}
			id++;
		});
	}
	return id;
}

addButton.addEventListener("click", () => {
	// show the questionCard
	questionCard.classList.add("showItem");
});

closeButton.addEventListener("click", () => {
	// hide the questionCard
	questionCard.classList.remove("showItem");
});

// Card constructor function
class Card {
	constructor(question, answer) {
		this.question = question;
		this.answer = answer;
		this.id = getId();
	}
	showFeedback() {
		feedback.textContent = "can not add empty values";
		feedback.classList.add("showItem", "alert-danger");

		setTimeout(() => {
			feedback.classList.remove("showItem", "alert-danger");
		}, 2000);
	}
	clearFields() {
		this.question.value = "";
		this.answer.value = "";
	}
	displayCards(cardList) {
		// clear the questionList before render anything
		questionsList.innerHTML = "";

		cardList.forEach((card) => {
			// insert an HTML element inside questionsList
			questionsList.insertAdjacentHTML(
				"beforeend",
				`<!-- Single Card -->
        <div class="col-md-4">
        <div class="card card-body flashcard my-3">
       <h4 class="text-capitalize">${card.question}?</h4>
       <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
       <h5 class="answer mb-3 text-capitalize">${card.answer}</h5>
       <div class="flashcard-btn d-flex justify-content-between">
       <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${card.id}">edit</a>
       <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${card.id}">delete</a>
      </div>
      </div>
      </div>
      <!-- end of single card -->`
			);
		});

		// manipulate the flashcard
		this.editCard(cardList);
		this.deleteCard(cardList);
	}
	showAnswer() {
		questionsList.addEventListener("click", (e) => {
			// show or hide the answer
			if (e.target.classList.contains("show-answer")) {
				e.target.nextElementSibling.classList.toggle("showItem");
			}
		});
	}
	editCard(cardList) {
		// find the specific card in the cardList and edit it
		questionsList.addEventListener("click", (e) => {
			if (e.target.classList.contains("edit-flashcard")) {
				// fetch the card id from the UI
				const cardId = e.target.dataset.id;
				// compare the id from the UI with card.id from cardList
				const cardIndex = cardList.findIndex(
					(card) => card.id === parseInt(cardId)
				);

				if (cardIndex > -1) {
					editingIndex = cardIndex;

					// show the questionCard with the values
					questionCard.classList.add("showItem");
					this.question.value = cardList[cardIndex].question;
					this.answer.value = cardList[cardIndex].answer;
				}
			}
		});
	}
	deleteCard(cardList) {
		// find the specific card in the cardList and remove it
		questionsList.addEventListener("click", (e) => {
			if (e.target.classList.contains("delete-flashcard")) {
				// fetch the card id from the UI
				const cardId = e.target.dataset.id;
				// compare the id from the UI with card.id from cardList
				const cardIndex = cardList.findIndex(
					(card) => card.id === parseInt(cardId)
				);

				if (cardIndex > -1) {
					cardList.splice(cardIndex, 1);
				}

				this.displayCards(cardList);
				saveCards(cardList);
			}
		});
	}
}

// initializing a new card
const card = new Card(questionInput, answerInput);

// render the saved cards and initialize the showAnswer() function
card.displayCards(cardList);
card.showAnswer();

// save cards to localStorage
function saveCards(cardList) {
	localStorage.setItem("card-list", JSON.stringify(cardList));
}

// fetch existing cards from localStorage
function getSavedCards() {
	const listJSON = localStorage.getItem("card-list");
	// validate the data if it is JSON
	try {
		return listJSON ? JSON.parse(listJSON) : [];
	} catch {
		return [];
	}
}

// create a new flashcard
form.addEventListener("submit", (e) => {
	if (questionCard.classList.contains("showItem")) {
		e.preventDefault();

		if (questionInput.value === "" || answerInput.value === "") {
			// show an error message if either input field is empty
			card.showFeedback();
		} else {
			// get the values from the input fields
			const cardValues = new Card(
				questionInput.value.trim().toLowerCase(),
				answerInput.value.trim().toLowerCase()
			);

			// check if contains the card
			if (editingIndex > -1) {
				cardList[editingIndex].question = questionInput.value;
				cardList[editingIndex].answer = answerInput.value;

				// exit from editing
				editingIndex = -1;
			} else {
				// add a new card to the end of cardList
				cardList.push(cardValues);
			}

			// render the cardList
			card.displayCards(cardList);

			// save the cards to localStorage
			saveCards(cardList);

			// empty the input fields
			card.clearFields();

			// hide the questionCard
			questionCard.classList.remove("showItem");
		}
	}
});
