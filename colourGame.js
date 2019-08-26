let numOfSquares = 6; // a variable that will be updated when state of the game is changed so the color generated is controllable
let colors = [];
let pickedColor;
let colorSquares = document.querySelectorAll('.square');
let colorDisplay = document.querySelector('#colorDisplay');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let resetButton = document.querySelector('#reset');
let modeButtons = document.querySelectorAll('.mode');

init();


// the function to run when app is initialized
function init() {
	//add eventlisteners to the mode buttons
	setUpModeButtons();
	// add eventListeeners to the colorSquares
	setUpSquares();
	//reset the whole game when started
	reset();
	//add eventListeners to resetButton
	resetButton.addEventListener("click", reset)
}


function reset() {
	//generate all new color
	colors = generateRandomColors(numOfSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change displayed color to match picked color
	colorDisplay.textContent = pickedColor;
	// changing message display to be empty
	messageDisplay.textContent = "";
	// resetting the reset button label to default
	resetButton.textContent = "New colors"
	//change the color of the colorsquares and hid the ones that do not have 
	//correlating color probably due to mode of game selected
	for (let i = 0; i < colorSquares.length; i++) {
		if (colors[i]){ // check if the index selected exist in color arr
			// in case any colorSquare had been made to disappear, change the display property
			//  back to 'block' if its index appears in the color arr
			colorSquares[i].style.display ='block';
			// then change the bg of colorSquare at that index in its respective array
			colorSquares[i].style.background = colors[i];
		} else { // if the color does not exist due to mode then hide the colorSquare
			colorSquares[i].style.display = 'none';
		}
	}
	//change h1 bg after reset or new game
	h1.style.background = "steelblue";
	
}

function setUpModeButtons() {
	for (let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function(){
			//a nested loop to remove the 'selected' class from all mode buttons
			for(let i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove('selected')
			}
			// then add the 'selected' class to the clicked button
			this.classList.add('selected')
			// updating numOfSquare depending on mode selected with a format that allows the adding of new mode
			if (this.textContent === "Easy") {
				numOfSquares = 3;
			} else if (this.textContent === "Hard") {
				numOfSquares = 6;
			};
			// if this is left at just 2 mode, then the tenary operator variatio of the above if statement will be more suitable
			// this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
			reset()
		});
	}
}

function setUpSquares() {
	for (let i = 0; i < colorSquares.length; i++) {
		// add click listeneres to squares
		colorSquares[i].addEventListener('click', function(){
			// grab color of picked square
			let clickedColor = this.style.background;
			// compare clickedColor to pickedColor 
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = 'Correct!'
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = '#232323';
				messageDisplay.textContent = 'Try Again'
			}
		});
	}
}



function changeColors(color) {
	//loop through all colorSquare 
	for (let i = 0; i < colorSquares.length; i++) {
	//change their background to match correct guess colour
	colorSquares[i].style.background = color;
	}
}

function pickColor(){
	let random = Math.floor(Math.random() * colors.length)
	return colors[random];
}

function generateRandomColors(NumOfWantedColors) {
	//make an array
	let arr = []
	//add NumOfWantedColors times
	for (let i = 0; i < NumOfWantedColors; i++) {
		// get Random color and push into array
		arr.push(randomColor());
	}
	//return that array
	return arr
}
 
function randomColor() {
	// pick a "red" from 0 to 255
	let Red = Math.floor(Math.random() * 256) //Math.random() is non-inclusive of the number it is multiplied by
	// pick a "green" from 0 to 255
	let Green = Math.floor(Math.random() * 256) 
	// pick a "blue" from 0 to 255
	let Blue = Math.floor(Math.random() * 256) 
	// conbine them to form an RGB color
	let RGBcolor = `rgb(${Red}, ${Green}, ${Blue})`;
	return RGBcolor;

}
