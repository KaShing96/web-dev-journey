let numSquares;

let colors;
let selectedColor;

var colorDisplay = document.querySelector("#color-display");
let h1 = document.querySelector("h1");
let message = document.querySelector("#message");
let resetButton = document.querySelector("#reset-button");
let difficultyButtons = document.querySelectorAll(".mode");
let squares = document.querySelectorAll(".square");

function init() {
    // Start on hard
    numSquares = 6;

    // Initialize colors
    colors = generateRandomColors(numSquares);
    selectedColor = pickColor(colors);

    // Add event listeners
    resetButton.addEventListener("click", function () {
        reset();
    });

    for (let i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener("click", function () {
            // Remove selected from both and manually re-add
            for (let j = 0; j < difficultyButtons.length; j++) {
                difficultyButtons[j].classList.remove("selected");
            }

            this.classList.add("selected");

            // Update number of squares
            this.textContent == "Easy" ? numSquares = 3 : numSquares = 6;

            // Reset game
            reset();
        });
    }


    // Start game
    reset()
}

init()

function reset() {

    // Generate new random colors
    colors = generateRandomColors(numSquares);

    // Select new picked color
    selectedColor = pickColor(colors);

    // Update RGB text and remove color from H1
    colorDisplay.textContent = selectedColor;
    h1.style.backgroundColor = "steelblue";

    // Recolour squares
    colorSquares();

    // Set resetButton text
    resetButton.textContent = "New Colours";

    // Clear message
    message.textContent = "";

    // Hide or show squares
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
}

// Color the squares
function colorSquares() {

    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
}

for (let i = 0; i < squares.length; i++) {

    // Add event listeners
    squares[i].addEventListener("click", function () {
        // Grab color of the clicked square
        let squareColor = this.style.backgroundColor;

        // Compare with selectedColor
        if (squareColor === selectedColor) {
            // Change all squares to green
            changeColors(squares);

            // Change h1
            h1.style.backgroundColor = selectedColor;

            // Message
            message.textContent = "Great work!";

            // Change 'New Colours' to 'Play Again'
            resetButton.textContent = "Play Again?";

        }
        else {
            // Fade out
            this.style.backgroundColor = "#232323";

            // Message
            message.textContent = "Try again!";
        }
    });
}

function changeColors(colors) {
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = selectedColor;
    }
}

function pickColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
    // Make array
    let arr = []

    // Add num random colors to array
    for (let i = 0; i < num; i++) {
        arr.push(`rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`)
    }

    // Return array
    return arr
}

function randomColor() {
    // Generate random color from 0-255
    return Math.floor(Math.random() * 256)
}