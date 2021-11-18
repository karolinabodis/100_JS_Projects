// The calculator evaluates basic expressions
(function () {
	const buttons = document.querySelectorAll("button[type='button']");
	const clearButton = document.querySelector(".btn-clear");
	const calcInput = document.querySelector(".screen");

	let total = 0;
	let operator = "";
	let num1 = 0;
	let num2 = 0;

	const numberInput = (buttons) => {
		if (calcInput.value === operator) {
			// delete the number before an operator is pressed
			calcInput.value = "";
		}
		// show the number inputs on the screen
		calcInput.value += buttons;
	};

	const operatorInput = (button) => {
		// save the 1st number
		num1 = calcInput.value;
		// show the pressed operator on the screen
		calcInput.value = button.dataset.num;
		// save the operator
		operator = button.dataset.num;

		numberInput(operator, button);
	};

	const calculate = () => {
		// show an error message when there is no input
		if (calcInput.value === "") {
			setTimeout(() => {
				calcInput.value = "Please enter a value";
				calcInput.classList.add("error");
			}, 200);
			setTimeout(() => {
				calcInput.value = "";
				calcInput.classList.remove("error");
			}, 2500);
		} else {
			// save the 2nd number
			num2 = calcInput.value;

			// convert the strings to a floating number
			num1 = parseFloat(num1);
			num2 = parseFloat(num2);

			// choose the saved operator and do the calculation
			switch (operator) {
				case "+":
					total = num1 + num2;
					break;
				case "-":
					total = num1 - num2;
					break;
				case "*":
					total = num1 * num2;
					break;
				case "/":
					total = num1 / num2;
					break;
			}

			// show the total on the screen
			calcInput.value = total;
		}
	};

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			if (button.classList.contains("btn-green")) {
				// record the operator for numberInput() & calculate()
				operatorInput(button);
			} else if (button.classList.contains("btn-equal")) {
				// show the result of calculation after the equal is pressed
				calculate();
			} else {
				let buttons = button.dataset.num;
				// show the number inputs on the screen
				numberInput(buttons);
			}
		});
	});

	// clear the input field
	clearButton.addEventListener("click", () => {
		calcInput.value = "";
	});
})();
