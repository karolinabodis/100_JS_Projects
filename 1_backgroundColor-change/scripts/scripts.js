// Changes backgroundColor each time a button is pressed

const button = document.querySelector(".btn");
const body = document.querySelector("body");
const container = document.querySelector(".container");
const p = document.createElement("p");

/*** VERSION 1 ***/
/*****************/
const colors = [
	"steelBlue",
	"coral",
	"darkSeaGreen",
	"silver",
	"deepPink",
	"cornsilk",
];

button.addEventListener("click", () => {
	// body.style.backgroundColor = "red";
	// 0-5
	const colorVal = Math.floor(Math.random() * colors.length);

	body.style.backgroundColor = colors[colorVal];

	p.textContent = colors[colorVal];
	p.classList.add("bg-light", "d-inline-block", "p-1", "m-3");
	container.appendChild(p);
});

/******************************************************************/

/*** VERSION 2 ***/
/*****************/
const hexValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const randomHexVal = () => Math.floor(Math.random() * hexValues.length);

const changeHexColor = () => {
	// let hexColor = `#127AA5`;
	let hexColor = "#";

	for (let i = 0; i < 6; i++) {
		hexColor += hexValues[randomHexVal()];
	}

	body.style.backgroundColor = hexColor;
	p.textContent = hexColor;
};

button.addEventListener("click", changeHexColor);

/******************************************************************/

/*** VERSION 3 ***/
/*****************/
// RGB values: 0 - 255 -> rgb(RED,GREEN,BLUE);

const randomRgbVal = () => Math.floor(Math.random() * 256);

const changeRgbColor = () => {
	// let rgbColor = "rgb(0, 150, 160)";
	let rgbColor = "rgb(";

	for (let i = 0; i < 3; i++) {
		rgbColor += randomRgbVal();

		i === 2 ? (rgbColor += ")") : (rgbColor += ",");
	}

	body.style.backgroundColor = rgbColor;
	p.textContent = rgbColor;
};

button.addEventListener("click", changeRgbColor);
