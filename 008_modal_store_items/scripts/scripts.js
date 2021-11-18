// Filter items by a class name or a search criteria

// 1. FILTER by a CLASS name //
/*****************************/
// using an IIFE to avoid contanminating global namespce
(function () {
	const filterButtons = document.querySelectorAll(".filter-btn");
	const storeItems = document.querySelectorAll(".store-item");

	const filterItems = (filterButton) => {
		storeItems.forEach((item) => {
			if (filterButton === "all" || item.classList.contains(filterButton)) {
				item.style.display = "block";
			} else {
				item.style.display = "none";
			}
		});
	};

	filterButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			//  prevent the default behaviour of in-page links - does not send the user to the top after a lower link is clicked -
			e.preventDefault();

			const filterButton = button.dataset.filter;
			filterItems(filterButton);
		});
	});
})();

// 2. FILTER by a SEARCH //
/*************************/
(function () {
	const searchBox = document.getElementById("search-item");
	const storeItems = document.querySelectorAll(".store-item");

	const searchItems = (searchText) => {
		storeItems.forEach((item) => {
			if (
				item
					.querySelector("h5#store-item-name")
					.textContent.includes(searchText)
			) {
				item.style.display = "block";
			} else {
				item.style.display = "none";
			}
		});
	};

	searchBox.addEventListener("input", () => {
		searchItems(searchBox.value.toLowerCase().trim());
	});
})();

// A lightbox pops up when a given item is clicked and closes after X is clicked
// All the items should cycle through the lightbox by clicking the left and right arrows

(function () {
	const itemImages = document.querySelectorAll(".store-img");
	const lightbox = document.querySelector(".lightbox-container");
	const lightboxClose = document.querySelector(".lightbox-close");
	const lightboxImage = document.querySelector(".lightbox-item");
	const lightboxControl = document.querySelectorAll(".lightbox-control");

	let currentImage = "";

	const setBcgImage = () =>
		(lightboxImage.style.backgroundImage = `url(${itemImages[currentImage].src})`);

	const showCurrentImage = (image) => {
		lightbox.classList.add("show");

		currentImage = Array.from(itemImages).indexOf(image);
		// console.log(currentImage);

		setBcgImage();
	};

	const showPrevImage = () => {
		currentImage--;

		if (currentImage < 0) {
			currentImage = itemImages.length - 1;
		}
		setBcgImage();
	};

	const showNextImage = () => {
		currentImage++;

		if (currentImage > itemImages.length - 1) {
			currentImage = 0;
		}
		setBcgImage();
	};

	const removeImage = () => {
		lightbox.classList.remove("show");
	};

	// a lightbox pops up
	itemImages.forEach((image) => {
		image.addEventListener("click", () => {
			showCurrentImage(image);
		});
	});

	// cycling through the lightbox by clicking the Left || Right arrow
	lightboxControl.forEach((control) => {
		control.addEventListener("click", (e) => {
			if (e.target.parentElement.classList.contains("btnLeft")) {
				showPrevImage();
			} else if (e.target.parentElement.classList.contains("btnRight")) {
				showNextImage();
			}
		});
	});

	// closing the lightbox by clicking the 'X' icon
	lightboxClose.addEventListener("click", () => {
		removeImage();
	});

	window.addEventListener("keyup", (e) => {
		// closing the lightbox by pressing the 'Escape' key
		if (e.key === "Escape") {
			removeImage();
		}
		// cycling through the lightbox by pressing the Left || Right arrow
		if (e.key === "ArrowLeft") {
			showPrevImage();
		} else if (e.key === "ArrowRight") {
			showNextImage();
		}
	});
})();
