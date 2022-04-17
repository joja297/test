/* navbar */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


$(document).ready(function() {
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function() {
                window.location.hash = hash;
            });
        }
    });

    $(window).scroll(function() {
        $(".slideanim").each(function() {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
})

//-- game --//

var numSquares = 8;
var colors = [];
var pickedColor;
var resetButton;
var modeButtons;
var colorDisplay;
var messageDisplay;
var h1;
var squares;

function varDec() {
    resetButton = document.querySelector("#reset");
    modeButtons = document.querySelectorAll(".mode");
    colorDisplay = document.querySelector("#colorDisplay");
    messageDisplay = document.querySelector("#message");
    h1 = document.querySelector("h1");
    squares = document.querySelectorAll(".square");
    init();
    resetButton.addEventListener("click", function() {
        reset();
    });
}

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = " " + pickedColor;
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "rgb(50, 2, 59)";
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                h1.style.backgroundColor = clickedColor;
                changeColors(clickedColor);
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") { numSquares = 4; } else if (this.textContent === "Medium") { numSquares = 8; } else { numSquares = 12; }
            reset();
        });
    }
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}