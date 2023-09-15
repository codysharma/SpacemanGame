  /*----- constants -----*/
const apiURL =`https://random-word-api.herokuapp.com/word?lang=en`

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
const rocketPicture = document.getElementById('rocket-picture');
//TODO: make rocket counter and show whenever an incorrect answer is chosen


//reset variables
let reset = document.querySelector("#reset");
let resetButton = document.querySelector("#reset-button");

//modal variables
let closeModalButton = document.querySelector("#close-modal")
let modal = document.querySelector("#modal")
let modalToggle = document.querySelector("#settings-button");
let botPlayToggle = document.querySelector("#yes-computer");
let botPlay = true;
const personPlayToggle = document.querySelector('#no-computer');
let timerOn = document.querySelector("#timer-toggle-on");
let timerOff = document.querySelector("#timer-toggle-off");
let timer = true;
const clock = document.getElementById('countdown-clock');
let incorrectGuessInput = document.querySelector("#incorrect-guess-number");
let gameClock = 10;
const sizeWord = document.getElementById('size-word');
const sizePhrase = document.getElementById('size-phrase');

//disabling options until ready
// botPlayToggle.disabled = true;
// personPlayToggle.disabled = true;
timerOn.disabled = true;
timerOff.disabled = true;
sizeWord.disabled = true;
sizePhrase.disabled = true;
incorrectGuessInput.disabled = true;

  /*----- cached elements  -----*/
randomWordApi(apiURL);


  /*----- event listeners -----*/
modal.style.display = "none";
//will re-add this once testing is complete to autoload
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
    resetGame();
    // clock.innerText = `Game Clock: ${gameClock}`;
    if (timer === true) {
        //setInterval(countDown(), 1000);
    }
    if (botPlay === true) {
        autoGenerateWord();
    } else {
        return;
    }
})

botPlayToggle.addEventListener("click", function(event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        botPlay = true;
    }
    resetGame();
})

personPlayToggle.addEventListener("click", function(event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        botPlay = false;
    }
    resetGame();
})

timerOn.addEventListener("click", function(event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        timer = true;
    }
    resetGame();
})

timerOff.addEventListener("click", function(event) {
    if (event.target && event.target.matches("input[type='radio']")) {
        timer = false;
    }
    resetGame();
})

//disable this event listener if phrase option on modal chosen
//doesn't allow spaces as inputs
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
                correctGuess();
            } else {
                incorrectGuess();
            }
        } else {
            warningsDisplay.innerText = "You already tried that letter. Try another."
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

function autoGenerateWord() {
    randomWordApi(apiURL);
    setTimeout(createMysteryWordArray(mysteryWord), 100);
    switchDisplaysOnWord();
    incorrectGuessNumber = incorrectGuessInput.value;
}

function correctGuess() {
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
}

function countDown () {
    gameClock -= 1;
    if (gameClock === 0) {
        loss();
    }
}

function createMysteryWordArray (word){
    mysteryWordArray = word.split("");
    fillInTheBlankArray = [];
    for (let i = 0; i < mysteryWordArray.length; i++) {
        fillInTheBlankArray.push("_ ");
    }
    fillInTheBlank.innerHTML = fillInTheBlankArray.join("");
    incorrectGuessNumber = incorrectGuessInput.value;
}

function incorrectGuess() {
    let incorrectLetters = [];
    incorrectLetters.push(letterGuess);
    //replace with function for appendList? Need to figure out how to take correct parameter
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
    warningsDisplay.innerText = `You were trying to guess "${mysteryWord}". Better luck next time`;
    letterGuessInput.disabled = true;
    reset.style.display = "block";
    rocketPicture.setAttribute("src", "./images/rocketgif.gif");
}

function randomWordApi (url) {
    fetch(apiURL,
        {type: "GET",
    })
    .then(data => {
        data.json()
        .then((processedData) => {
            mysteryWord = processedData[0];
        })
    })
}

function resetGame() {
    mysteryWord, mysteryWordArray, letterGuess = undefined;
    mysteryWordInput.style.display = "";
    warningsDisplay.innerText = "";
    letterGuessForm.style.display = "";
    fillInTheBlank.style.display = "";
    incorrectGuessCounter.innerText = "";
    fillInTheBlank.innerHTML = "";
    reset.style.display = "none";
    letterGuessInput.disabled = false;
    guessedLetters = [];  
    document.querySelector("#incorrect-letters").innerText = "";
    incorrectGuessNumber = 5;
    rocketPicture.setAttribute("src", "./images/rocketstill.gif");
    if (botPlay === true) {
        autoGenerateWord();
    }
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