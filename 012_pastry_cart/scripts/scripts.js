/***  
  Filter items by a class name or a search criteria
***/

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

/*** 
  A lightbox pops up when a given item is clicked and closes after X is clicked
  All the items should cycle through the lightbox by clicking the left and right arrows 
***/

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

/*** 
  After a store item's cart was clicked an alert pops up that a store item is added to the cart
  The running total shows the total amount in the top right-hand corner 
***/

(function () {
	const itemCount = document.getElementById("item-count");
	const banner = document.querySelector(".max-height");
	const cartBadge = document.querySelector(".badge");

	const cartItems = document.querySelector(".cart-items");
	const cartTotal = document.getElementById("cart-total");
	const clearCart = document.getElementById("clear-cart");

	const storeItems = document.querySelectorAll(".store-item");
	const notification = document.querySelector(".alert");

	let cartList = [];

	itemCount.parentElement.parentElement.addEventListener("click", () => {
		// display the cart
		cartItems.parentElement.classList.toggle("show-cart");
	});

	cartBadge.parentElement.addEventListener("click", () => {
		// display the cart and make the background blurry
		cartItems.parentElement.classList.toggle("show-cart");
		if (cartItems.parentElement.classList.contains("show-cart")) {
			banner.style.filter = `blur(5px) grayscale(50%)`;
		} else {
			banner.style.filter = "none";
		}
	});

	// notify the user that a cartItem has been added to the cart
	const showAlert = () => {
		notification.classList.add("show");
		setTimeout(() => {
			notification.classList.remove("show");
		}, 3000);
	};

	// clear the cart before rendering
	const clearCartDisplay = () => {
		cartItems.innerHTML = "";
		cartBadge.dataset.count = 0;
		itemCount.textContent = 0;
		itemCount.nextElementSibling.textContent = parseInt(0).toFixed(2);
		cartTotal.textContent = parseInt(0).toFixed(2);
	};

	const displayCartItems = (cartList) => {
		// clear (the samples and) the cart before rendering anything
		clearCartDisplay();

		cartList.forEach((cart) => {
			// insert an HTML element inside cartItems
			cartItems.insertAdjacentHTML(
				"beforeend",
				`<div class="cart-item d-flex justify-content-between text-capitalize my-3">
			<img src="${cart.image}" class="img-fluid rounded-circle" id="item-img" alt="">
			<div class="cart-item-text">
			<p id="cart-item-title" class="font-weight-bold mb-0">${cart.title}</p>
			<span>$</span>
			<span id="cart-item-price" class="mb-0">${parseFloat(cart.price).toFixed(
				2
			)}</span>
				</div>
				<a href="#" id='cart-item-remove' class="cart-item-remove">
				<i class="fas fa-trash"></i>
				</a>
				</div>`
			);

			// update the cartBadge and cartInfo after a new item
			cartBadge.dataset.count = parseInt(cartBadge.dataset.count) + 1;
			itemCount.textContent = parseInt(itemCount.textContent) + 1;
		});
		// update the total of the cartInfo and cart after a new item
		itemCount.nextElementSibling.textContent = sumCartItems();
		cartTotal.textContent = sumCartItems();
	};

	// calculate the total price
	const sumCartItems = () => {
		let sum = 0;
		cartList.forEach((cart) => {
			sum += parseFloat(cart.price);
		});
		return sum.toFixed(2);
	};

	// delete a cartItem by clicking the trash icon
	window.addEventListener("click", (e) => {
		if (e.target.parentElement.classList.contains("cart-item-remove")) {
			const currentImage =
				e.target.parentElement.previousElementSibling.previousElementSibling
					.src;

			const itemIndex = cartList.findIndex(
				(element) => element.image === currentImage
			);

			cartList.splice(itemIndex, 1);

			displayCartItems(cartList);
		}
	});

	// clear the cart
	clearCart.addEventListener("click", () => {
		clearCartDisplay();
	});

	storeItems.forEach((item) => {
		const cartIcon = item.querySelector(".store-item-icon");

		cartIcon.addEventListener("click", () => {
			// show the notification
			showAlert();

			// STORE items
			const storeItemImage = cartIcon.previousElementSibling;
			const storeItemPrice = item.querySelector("#store-item-price");
			const storeItemTitle =
				storeItemPrice.parentElement.previousElementSibling;

			// add a new item to the cartList
			cartList.push({
				image: storeItemImage.src.replace("/images/", "/images/cart/"),
				title: storeItemTitle.textContent,
				price: storeItemPrice.textContent,
			});

			displayCartItems(cartList);
		});
	});
})();
