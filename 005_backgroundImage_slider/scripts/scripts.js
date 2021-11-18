// Shows up the next image each time when an arrow is clicked

(function () {
	// select BOTH buttons
	const buttons = document.querySelectorAll(".btn");
	const imageContainer = document.querySelector(".img-container");
	// access the images from an array
	const images = [
		"bcg-0",
		"bcg-1",
		"bcg-2",
		"bcg-3",
		"bcg-4",
		"bcg-5",
		"bcg-6",
		"bcg-7",
		"bcg-8",
		"bcg-9",
	];
	// keep track of the images
	let counter = 0;

	const showImage = (counter) =>
		(imageContainer.style.backgroundImage = `url(images/bcg-${counter}.jpg)`);

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			if (button.classList.contains("btn-left")) {
				counter--;
				if (counter < 0) {
					counter = images.length - 1;
				}
				showImage(counter);
			} else if (button.classList.contains("btn-right")) {
				counter++;
				if (counter > images.length - 1) {
					counter = 0;
				}
				showImage(counter);
			}
		});
	});
})();
