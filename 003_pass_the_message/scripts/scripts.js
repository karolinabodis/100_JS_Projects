// Shows up a new message each time a button is pressed

(function () {
	const form = document.getElementById("message-form");
	const inputText = document.getElementById("message");
	const errorMessage = document.querySelector(".feedback");
	const message = document.querySelector(".message-content");

	const showTheMessage = (e) => {
		// prevents the form's default submission behaviour
		e.preventDefault();

		if (inputText.value !== "") {
			// show up the message and clear the input field
			message.textContent = inputText.value;
			inputText.value = "";
		} else {
			// show up an error message
			errorMessage.classList.add("show");
			setTimeout(() => {
				errorMessage.classList.remove("show");
			}, 2000);
		}
	};

	form.addEventListener("submit", showTheMessage);
})();
