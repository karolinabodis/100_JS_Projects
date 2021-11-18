// Filter items by a class name or a search criteria

// 1. FILTER by a CLASS name //
/*****************************/
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

/***********************/
/*** DATA ATTRIBUTES ***/
/***********************/
// data-*, GLOBAL attributes (custom data attributes) that allows proprietary information to be exchanged between HTML and its DOM - store extra information on standard, semantic HTML elements -
// * may be replaced by any name (except: not start with xml && not contain (:) && not contain capital letters)
// store constantly changing information: e.g: scores in a game (data-score="100") + acces via CSS generated content (::before || ::after)
// https://www.youtube.com/watch?v=On_WyUB1gOk

// HTML SYNTAX: data- (any element starts with); e.g.: data-parent="cars" | data-index-number="12314"

// JAVASCRIPT ACCESS via: element.dataset.testValue || element.dataset["testValue"] (any (-) is replaced by capitalization -> convert to camelCase) || getAttribute() with full HTML name; e.g.: article.dataset.parent // "cars" | article.dataset.indexNumber // "12314"
// each property is a STRING and can be Read and Written; e.g.: article.dataset.columns = 5 // "5"

// CSS ACCESS via: use generated content with attr() function || attribute selectors; e.g.: article::before { content: attr(data-parent);}  | article[data-columns='3'] { width: 400px;}
