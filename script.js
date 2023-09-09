  /*----- constants -----*/


  /*----- state variables -----*/
let submitWordButton = document.querySelector("#word-input-button");
let mysteryWordValue = document.querySelector("#mystery-word")
let mysteryWordInput = document.querySelector("#mystery-word-input")
let mysteryWord;
let mysteryWordArray;
let warningsDisplay = document.querySelector("#warnings");
let letterGuessForm = document.querySelector("#letter-guess-form")
let letterGuessInput = document.querySelector("#letter-guess")
let letterGuess;
let fillInTheBlank = document.querySelector("#fill-in-the-blank");
let fillInTheBlankArray = [];
let guessedLetters = [];
let incorrectLetters = [];
let incorrectGuessCounter = document.querySelector("#counter");
let incorrectGuessNumber = 5;
let reset = document.querySelector("#reset")


  /*----- cached elements  -----*/


  /*----- event listeners -----*/
submitWordButton.addEventListener("click", function(event) {
    event.preventDefault();
    mysteryWord = mysteryWordValue.value.toLowerCase();
    if (/^[A-Za-z\s]*$/.test(mysteryWord) === false) {
        warningsDisplay.innerText = "Your word cannot contain anything other than letters and spaces. Please try again";
        return false;
    }
    switchDisplaysOnWord();
    mysteryWordArray = mysteryWord.split("");
    for (let i = 0; i < mysteryWordArray.length; i++) {
        fillInTheBlankArray.push("_ ");
    }
    fillInTheBlank.innerHTML = fillInTheBlankArray.join("");
})

letterGuessInput.addEventListener("input", function(event) {
    event.preventDefault();
    letterGuess = letterGuessInput.value;
    letterGuessInput.value = "";
    if (/^[A-Za-z\s]*$/.test(letterGuess) === false) {
        warningsDisplay.innerText = "Your guess must be a letter. Please try again";
    } else {
        warningsDisplay.innerText = "";
        if (guessedLetters.includes(letterGuess) === false) {
            guessedLetters.push(letterGuess);
            if (mysteryWordArray.includes(letterGuess) === true) {
                let letterSpot = [];
                for (let j = 0; j < mysteryWordArray.length; j++){
                    if (letterGuess === mysteryWordArray[j]){
                        letterSpot.push(j)
                    } else {
                    }
                }
                for (let k = 0; k < letterSpot.length; k++) {
                    fillInTheBlankArray[letterSpot[k]] = letterGuess;
                }
                fillInTheBlank.innerHTML = fillInTheBlankArray.join("");
            } else {
                incorrectGuess();
            }
        } else {
            //add error message like, "letter already tried"?
        }
        if (fillInTheBlank.innerText.includes("_") === false){
            win();
        }
    }   
})

  /*----- functions -----*/
function incorrectGuess() {
    incorrectLetters.push(letterGuess);
    var ul = document.querySelector("#incorrect-letters");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(incorrectLetters[incorrectLetters.length-1]));
    ul.appendChild(li);
    incorrectGuessNumber--;
    incorrectGuessCounter.innerText = `  Incorrect guesses left: ${incorrectGuessNumber}`;
    if (incorrectGuessNumber === 0) {
        warningsDisplay.innerText = "You lost. Better luck next time";
        letterGuessInput.disabled = true;
        reset.style.display = "block";
    }
}

function incorrectFormat(inputString) {
    
}

function switchDisplaysOnWord() {
    mysteryWordInput.style.display = "none"
    warningsDisplay.innerText = "";
    letterGuessForm.style.display = "block";
    fillInTheBlank.style.display = "block";
    incorrectGuessCounter.innerText = `  Incorrect guesses left: ${incorrectGuessNumber}`;
}

function win() {
    warningsDisplay.innerText = "You've won!";
    letterGuessInput.disabled = true;
    reset.style.display = "block";
}