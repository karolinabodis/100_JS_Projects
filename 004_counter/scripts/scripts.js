// Count up or count down in numbers each time its button is pressed

/*** VERSION 1 ***/
/*****************/

/*
const counter = document.getElementById("counter");
const subtractButton = document.querySelector(".prevBtn");
const addButton = document.querySelector(".nextBtn");
const resetButton = document.querySelector(".resetBtn");

let number = 0;

const colorChange = (number) => {
	if (number < 0) {
		counter.style.color = "red";
	} else if (number > 0) {
		counter.style.color = "green";
	} else {
		counter.style.color = "#333333";
	}
};

const lowerCount = () => {
	number--;
	counter.textContent = number;

	colorChange(number);
};

const addCount = () => {
	number++;
	counter.textContent = number;

	colorChange(number);
};

const resetCount = () => {
	number = 0;
	counter.textContent = number;

	colorChange(number);
};

subtractButton.addEventListener("click", lowerCount);
addButton.addEventListener("click", addCount);
resetButton.addEventListener("click", resetCount);
*/

/******************************************************************/

/*** VERSION 2 ***/
/*****************/
(function () {
	// select the COMMON class of the buttons
	const buttons = document.querySelectorAll(".counterBtn");

	const counter = document.getElementById("counter");
	let number = 0;

	// addEventListener-s and functionality to EACH button
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			if (button.classList.contains("prevBtn")) {
				number--;
			} else if (button.classList.contains("nextBtn")) {
				number++;
			} else {
				number = 0;
			}

			counter.textContent = number;
			// style the counter text
			if (number < 0) {
				counter.style.color = "red";
			} else if (number > 0) {
				counter.style.color = "green";
			} else {
				counter.style.color = "#333333";
			}
		});
	});
})();
