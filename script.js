  /*----- constants -----*/


  /*----- state variables -----*/
//Find a way to create a game setup "state" object with incorrectGuessNumber, Timer, etc.?
const state = {
    timerInterval: null,
}

  //input variables
let submitWordButton = document.querySelector("#word-input-button");
let mysteryWordValue = document.querySelector("#mystery-word")
let mysteryWordInput = document.querySelector("#mystery-word-input")
let mysteryWord;
let mysteryWordArray;

//display variables
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

//reset variables
let reset = document.querySelector("#reset");
let resetButton = document.querySelector("#reset-button");

//modal variables
let closeModalButton = document.querySelector("#close-modal")
let modal = document.querySelector("#modal")
let modalToggle = document.querySelector("#settings-button");
let botPlay = document.querySelector("#yes-computer");
let timerOn = document.querySelector("#timer-toggle-on");
let timerOff = document.querySelector("#timer-toggle-off");
let incorrectGuessInput = document.querySelector("#incorrect-guess-number");
let time = 120;
const sizeWord = document.getElementById('size-word');
const sizePhrase = document.getElementById('size-phrase');

//disabling options until ready
botPlay.disabled = true;
timerOn.disabled = true;
timerOff.disabled = true;
incorrectGuessInput.disabled = true;
sizeWord.disabled = true;
sizePhrase.disabled = true;

  /*----- cached elements  -----*/


  /*----- event listeners -----*/
modal.style.display = "none";
//will re-add this once testing is complete
// modalTextBox.addEventListener("loadedmetadata", function(event) {
//     event.preventDefault();
//     modal.style.display = "none"
// })

modalToggle.addEventListener("click", function(event) {
    event.preventDefault();    
    modal.style.display = "";
})

closeModalButton.addEventListener("click", function(event) {
    event.preventDefault();
    modal.style.display = "none";
})

//disable this event listener if option on modal chosen
mysteryWordValue.addEventListener("keyup", function(event) {
    mysteryWordValue.setAttribute("onkeypress", "return event.charCode != 32");
})

submitWordButton.addEventListener("click", function(event) {
    event.preventDefault();
    mysteryWord = mysteryWordValue.value.toLowerCase();
    if (/^[A-Za-z\s]*$/.test(mysteryWord) === false) {
        warningsDisplay.innerText = "Your word cannot contain anything other than letters and spaces. Please try again";
        return false;
    }
    createMysteryWordArray(mysteryWord);
    switchDisplaysOnWord();
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

resetButton.addEventListener("click", function(event) {
    resetGame();
})

  /*----- functions -----*/
function appendList() {
}

function countDown () {
    //do the incrementment down from 120s
    //if timer.Interval === 0, loss();
}

function createMysteryWordArray (word){
    mysteryWordArray = word.split("");
    fillInTheBlankArray = [];
    for (let i = 0; i < mysteryWordArray.length; i++) {
        fillInTheBlankArray.push("_ ");
    }
    fillInTheBlank.innerHTML = fillInTheBlankArray.join("");
}

function incorrectGuess() {
    let incorrectLetters = [];
    incorrectLetters.push(letterGuess);
    //replace with appendList function? Need to figure out how to take correct parameter
    var ul = document.querySelector("#incorrect-letters");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(incorrectLetters[incorrectLetters.length-1]));
    ul.appendChild(li);
    incorrectGuessNumber--;
    incorrectGuessCounter.innerText = `T minus - ${incorrectGuessNumber}`;
    if (incorrectGuessNumber === 0) {
        loss();
    }
}

function incorrectWordFormat(inputString) {
    //to be written
}

function loss() {
    warningsDisplay.innerText = `Your word was "${mysteryWord}". Better luck next time`;
    letterGuessInput.disabled = true;
    reset.style.display = "block";
}

function resetGame() {
    let mysteryWord, mysteryWordArray, letterGuess = undefined;
    mysteryWordInput.style.display = "";
    warningsDisplay.innerText = "";
    letterGuessForm.style.display = "";
    fillInTheBlank.style.display = "";
    incorrectGuessCounter.innerText = "";
    fillInTheBlank.innerHTML = "";
    reset.style.display = "none";
    letterGuessInput.disabled = false;
    document.querySelector("#incorrect-letters").innerText = "";
    incorrectGuessNumber = 5;
}

function switchDisplaysOnWord() {
    mysteryWordInput.style.display = "none"
    warningsDisplay.innerText = "";
    letterGuessForm.style.display = "block";
    fillInTheBlank.style.display = "block";
    incorrectGuessCounter.innerText = `T minus - ${incorrectGuessNumber}`;
}

function win() {
    warningsDisplay.innerText = "You've won!";
    letterGuessInput.disabled = true;
    reset.style.display = "block";
}