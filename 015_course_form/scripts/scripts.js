// A course can be generated then displayed from the user provided data with Object Oriented JavaScript

"use strict";
// Create an IIFE to close the app off from the global scope
(function () {
	const form = document.getElementById("customer-form");
	const fullName = document.getElementById("name");
	const course = document.getElementById("course");
	const author = document.getElementById("author");

	const submitButton = document.querySelector(".submitBtn");
	const feedback = document.querySelector(".feedback");
	const loading = document.querySelector(".loading");
	const customerList = document.querySelector(".customer-list");

	const getRandomNumber = () => Math.floor(Math.random() * 6);

	// Customer constructor function
	class Customer {
		constructor(fullName, course, author) {
			this.fullName = fullName;
			this.course = course;
			this.author = author;
			this.image = `images/customer-${getRandomNumber()}.jpg`;
		}
		checkInputFields() {
			// blur event - fires when an element has lost focus -
			// make the input fields blurry
			this.fullName.addEventListener("blur", this.validateInputField);
			this.course.addEventListener("blur", this.validateInputField);
			this.author.addEventListener("blur", this.validateInputField);

			// remove the complete class, disable the button
			this.fullName.classList.remove("complete");
			this.course.classList.remove("complete");
			this.author.classList.remove("complete");
			submitButton.disabled = true;
		}
		validateInputField() {
			if (this.value === "") {
				this.classList.add("fail");
				this.classList.remove("complete");
			} else {
				this.classList.add("complete");
				this.classList.remove("fail");

				const completed = document.querySelectorAll(".complete");

				if (completed.length === 3) {
					submitButton.disabled = false;
				} else {
					submitButton.disabled = true;
				}
			}
		}
		showFeedback(customer) {
			feedback.classList.add("showItem", "alert", "alert-success");
			loading.classList.add("showItem");
			submitButton.style.display = "none";

			setTimeout(() => {
				feedback.classList.remove("showItem", "alert", "alert-success");
				loading.classList.remove("showItem");
				submitButton.style.display = "block";
				// render a new course
				this.displayCourse(customer);
			}, 2000);
		}
		displayCourse(customer) {
			// clear the customerList before render anything
			// customerList.innerHTML = "";

			// insert an HTML element inside customerList
			customerList.insertAdjacentHTML(
				"beforeend",
				`<div class="col-11 mx-auto col-md-6 col-lg-4 my-3">
		<!-- Card -->
		<div class="card text-left">
			<img src="${customer.image}" class="card-img-top" alt="">
			<div class="card-body">
				<!-- Customer Name -->
				<h6 class="text-capitalize "><span class="badge badge-info mr-2">name :</span><span
						id="customer-name">${customer.fullName}</span></h6>
				<!-- end of customer name -->
	
				<!-- Customer Course -->
				<h6 class="text-capitalize my-3"><span class="badge badge-dark mr-2">course :</span><span
						id="customer-course">
						${customer.course}
					</span></h6>
				<!-- end of customer course -->
	
				<!-- Course Author -->
				<h6 class="text-capitalize"><span class="badge badge-success mr-2">author :</span><span
						id="course-author">${customer.author}</span></h6>
				<!-- end of course author -->
			</div>
		</div>
		<!-- end of card -->
	</div>
	<!-- end of single customer -->`
			);
		}
		clearFields() {
			this.fullName.value = "";
			this.course.value = "";
			this.author.value = "";
		}
	}

	// initial checking
	const inputCustomer = new Customer(fullName, course, author);
	inputCustomer.checkInputFields();

	// submit the customer
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		// reset to initial state the fields and submitButton
		inputCustomer.checkInputFields();

		// get the values from input fields and create a new Customer
		const customer = new Customer(
			fullName.value.trim().toLowerCase(),
			course.value.trim().toLowerCase(),
			author.value.trim().toLowerCase()
		);
		// show message, loader gif and render the course
		inputCustomer.showFeedback(customer);

		// empty the input fields
		inputCustomer.clearFields();
	});
})();
