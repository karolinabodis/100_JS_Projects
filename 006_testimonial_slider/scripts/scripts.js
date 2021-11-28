// Shows up the next testimonial each time when an arrow is clicked

(function () {
	const customerImage = document.getElementById("customer-img");
	const customerName = document.getElementById("customer-name");
	const customerTestimonial = document.getElementById("customer-text");
	const buttons = document.querySelectorAll(".btn");
	const fadeCustomer = document.querySelectorAll(".fadeOut");

	// keep track of the testimonials
	let index = 0;
	const customers = [];

	// create a new Customer object via Customer constructor function
	class Customer {
		constructor(image, firstName, testimonial) {
			this.image = image;
			this.firstName = firstName;
			this.testimonial = testimonial;
		}
		createACustomer() {
			let image = `images/customer-${this.image}.jpg`;
			let customer = new Customer(image, this.firstName, this.testimonial);

			customers.push(customer);

			return customers;
		}
	}

	const customer0 = new Customer(
		0,
		"John",
		"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	);
	const customer1 = new Customer(
		1,
		"Sarah",
		"If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
	);
	const customer2 = new Customer(
		2,
		"Adam",
		"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
	);
	const customer3 = new Customer(
		3,
		"Lily",
		"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock"
	);
	const customer4 = new Customer(
		4,
		"David",
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis neque reprehenderit laborum, corporis explicabo assumenda. Porro impedit consectetur animi, reprehenderit recusandae sapiente at aliquam reiciendis modi ipsam rerum suscipit distinctio?"
	);

	// create an array of Customer objects
	customer0.createACustomer();
	customer1.createACustomer();
	customer2.createACustomer();
	customer3.createACustomer();
	customer4.createACustomer();
	// console.log(customers);

	// fade in the customer
	const hideCustomer = () => {
		fadeCustomer.forEach((element) => {
			element.classList.add("fadeIn");
		});
	};

	// fade out the customer
	const showCustomer = () => {
		fadeCustomer.forEach((element) => {
			element.classList.remove("fadeIn");
		});
	};

	// display a customer in the UI
	const displayACustomer = (index) => {
		customerImage.src = customers[index].image;
		customerName.textContent = customers[index].firstName;
		customerTestimonial.textContent = customers[index].testimonial;
	};

	buttons.forEach((button) => {
		button.addEventListener("click", (e) =>
			// the parentElement can "catch" all clicks made inside -> event bubbling
			{
				if (e.target.parentElement.classList.contains("prevBtn")) {
					index--;

					if (index < 0) {
						index = customers.length - 1;
					}

					hideCustomer();
					setTimeout(displayACustomer, 500, index);
					setTimeout(showCustomer, 500);
				} else if (e.target.parentElement.classList.contains("nextBtn")) {
					index++;

					if (index > customers.length - 1) {
						index = 0;
					}

					hideCustomer();
					setTimeout(displayACustomer, 500, index);
					setTimeout(showCustomer, 500);
				}
			}
		);
	});
})();
