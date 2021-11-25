// A tip calculator evaluates the tip that each person may have to pay based on the service

(function () {
	const billInput = document.getElementById("input-bill");
	const guestsInput = document.getElementById("input-users");
	const serviceInput = document.getElementById("input-service");
	const form = document.getElementById("tip-form");
	const submitBtn = document.querySelector(".submitBtn");
	const results = document.querySelector(".results");
	const errorMessage = document.querySelector(".feedback");
	const loader = document.querySelector(".loader");

	const calculateAmount = (serviceValue) => {
		// calculate and display the amount of tip after service
		const totalAmount = billInput.value * serviceValue;
		const tipAmount = totalAmount - billInput.value;
		const personOwes = totalAmount / guestsInput.value;

		results.querySelector("#tip-amount").textContent = tipAmount.toFixed(2);
		results.querySelector("#total-amount").textContent = totalAmount.toFixed(2);
		results.querySelector("#person-amount").textContent = personOwes.toFixed(2);
	};

	const calculateTip = () => {
		// hide the Calculate button - to avoid the errors
		submitBtn.style.display = "none";
		// disable the inputs - to avoid the errors
		billInput.disabled = true;
		guestsInput.disabled = true;
		serviceInput.disabled = true;

		// display the loader and hide after 2.5 seconds
		loader.style.display = "block";
		setTimeout(() => {
			loader.style.display = "none";
			// display the results
			results.classList.add("showItem");
		}, 2500);

		// calculate the tip based on the service experience
		if (serviceInput.value === "1") {
			// great - 20%
			calculateAmount(1.2);
		} else if (serviceInput.value === "2") {
			// good - 10%
			calculateAmount(1.1);
		} else {
			// bad - 2%
			calculateAmount(1.02);
		}
	};

	// clear all form elements after 10 seconds
	const resetCalculator = () => {
		setTimeout(() => {
			billInput.value = "";
			guestsInput.value = "";
			serviceInput.value = "0";

			// hide the results
			results.classList.remove("showItem");
			// display the Calculate button
			submitBtn.style.display = "block";
			// enable the inputs
			billInput.disabled = false;
			guestsInput.disabled = false;
			serviceInput.disabled = false;
		}, 10000);
	};

	// create an error if the user forgets to add input or the input is blank
	const createParagraph = (text) => {
		const newParagraph = document.createElement("p");
		newParagraph.textContent = text;
		errorMessage.appendChild(newParagraph);
	};

	const showError = () => {
		errorMessage.textContent = "";
		errorMessage.classList.add("showItem", "alert-danger");

		if (billInput.value === "" || parseFloat(billInput.value) <= 0) {
			createParagraph("Bill amount can not be blank or zero");
		}
		if (guestsInput.value === "" || parseInt(guestsInput.value) < 1) {
			createParagraph("Number of guests must be greater than zero");
		}
		if (serviceInput.value === "0") {
			createParagraph("You must select a service");
		}
	};

	const hideError = () => {
		setTimeout(() => {
			errorMessage.classList.remove("showItem", "alert-danger");
		}, 5000);
	};

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		if (
			// no errors, all inputs are provided
			billInput.value !== "" &&
			parseFloat(billInput.value) > 0 &&
			guestsInput.value !== "" &&
			parseInt(guestsInput.value) >= 1 &&
			serviceInput.value !== "0"
		) {
			calculateTip();
			resetCalculator();
		} else {
			// show errors, missing inputs
			showError();
			hideError();
		}
	});
})();
