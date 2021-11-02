// Generates a new quote each time a button is pressed

(function () {
	const quotes = [
		{
			quote:
				"Life is too short and sweet to be spent by cribbing and complaining about things. Here are some random quotes about the most wonderful gift that we've got.",
			author: "Life",
		},
		{
			quote: "Live life to the fullest, and focus on the positive.",
			author: "Matt Cameron",
		},
		{
			quote: "It always seems impossible until it's done.",
			author: "Nelson Mandela",
		},
		{
			quote: "Only I can change my life. No one can do it for me.",
			author: "Carol Burnett",
		},
		{
			quote: "If you can dream it, you can do it.",
			author: "Walt Disney",
		},
		{
			quote:
				"All our dreams can come true, if we have the courage to pursue them.",
			author: "Walt Disney",
		},
		{
			quote:
				"Knowing is not enough; we must apply. Willing is not enough; we must do.",
			author: "Johann Wolfgang von Goethe",
		},
		{
			quote: "In order to succeed, we must first believe that we can.",
			author: "Nikos Kazantzakis",
		},
		{
			quote:
				"Opportunity does not knock, it presents itself when you beat down the door.",
			author: "Kyle Chandler",
		},
		{
			quote:
				"Follow your dreams, work hard, practice and persevere. Make sure you eat a variety of foods, get plenty of exercise and maintain a healthy lifestyle.",
			author: "Sasha Cohen",
		},
	];

	const quote = document.getElementById("quote");
	const author = document.querySelector(".author");
	const button = document.getElementById("generate-btn");

	const generateQuote = () => {
		const randomQuoteVal = Math.floor(Math.random() * quotes.length);
		const randomQuote = quotes[randomQuoteVal];

		quote.textContent = randomQuote.quote;
		author.textContent = randomQuote.author;
	};

	button.addEventListener("click", generateQuote);
})();

/************/
/*** IIFE ***/
/************/

/*
(function () {
  // statements
})();
*/

// Immediately Invoked Function Expression
// design pattern, also known as a Self-Executing Anonymous Function
// 2 major part:
/*
1/ the ANONYMUS function with lexical scope enclosed within the Grouping Operator(); prevents accessing variables within IIFE && polluting the Global scope
2/ creates the immediately invoked function expression (); JS will directly interpret the function
*/

// USE cases:
// - avoid polluting the global namespace: LIMIT the number of GLOBAL variables -> initiation code, do NOT NEED TO USE AGAIN use IIFE
// USING IIFE is better than using a function declaration || expression
// - module pattern: create PRIVATE and PUBLIC variables and methods
