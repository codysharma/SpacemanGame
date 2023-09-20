  /*----- constants -----*/
const apiURL =`https://random-word-api.herokuapp.com/word`

  /*----- state variables -----*/
const state = {
    botPlay: true,
    timed: true,
    incorrectGuessInARow: 0,
    incorrectGuessNumber: 5,
    timeLeft: 120,
    fillInTheBlankArray: [],
    guessedLetters: [],
    incorrectLetters: [],
}

//input variables
let mysteryWord;
let mysteryWordArray;
let mysteryWordInput = document.querySelector("#mystery-word-input");
let mysteryWordValue = document.querySelector("#mystery-word");
let submitWordButton = document.querySelector("#word-input-button");

//display variables
let letterGuess;
const hintButton = document.getElementById('hint');
let fillInTheBlank = document.querySelector("#fill-in-the-blank");
const guessedInfoText = document.getElementById('guessed-info-text');
let incorrectGuessCounter = document.querySelector("#counter");
let letterGuessForm = document.querySelector("#letter-guess-form");
let letterGuessInput = document.querySelector("#letter-guess");
const letterGuessMessage = document.getElementById('letter-guess-message');
const opponent = document.getElementById('opponent');
const rocketPicture = document.getElementById('rocket-picture');
const lossMessage = document.getElementById('loss-message');
let warningsDisplay = document.querySelector("#warnings");

//reset variables
let reset = document.querySelector("#reset");
let resetButton = document.querySelector("#reset-button");

//modal variables
let intervalID;
const clock = document.getElementById('countdown-clock');
let closeModalButton = document.querySelector("#close-modal")
const countdownText = document.getElementById('countdown-text');
let incorrectGuessInput = document.querySelector("#incorrect-guess-number");
let modal = document.querySelector("#modal")
const sizePhrase = document.getElementById('size-phrase');
const sizeWord = document.getElementById('size-word');

//disabling options until ready
sizeWord.disabled = true;
sizePhrase.disabled = true;

//old var declarations kept in case of troubleshooting/feature upgrade:
// let modalToggle = document.querySelector("#settings-button");
// let botPlayToggle = document.querySelector("#yes-computer");
// const personPlayToggle = document.querySelector('#no-computer');
// let timerOn = document.querySelector("#timer-toggle-on");
// let timerOff = document.querySelector("#timer-toggle-off");
// state.botPlayToggle.disabled = true;
// personPlayToggle.disabled = true;
// timerOn.disabled = true;
// timerOff.disabled = true;
// incorrectGuessInput.disabled = true;


  /*----- cached elements  -----*/


  /*----- event listeners -----*/
closeModalButton.addEventListener("click", function(event) {
    event.preventDefault();
    modal.style.display = "none";
    resetGame();
    if (state.botPlay === false) {
        clock.innerText = "";
    }
})

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
    if (state.timed === true) {
        intervalID = setInterval(countDown, 1000);
    }
})

letterGuessInput.addEventListener("input", function(event) {
    event.preventDefault();
    letterGuess = letterGuessInput.value;
    letterGuessInput.value = "";
    if (/^[A-Za-z\s]*$/.test(letterGuess) === false) {
        warningsDisplay.innerText = "Your guess must be a letter. Please try again";
    } else {
        warningsDisplay.innerText = "";
        if (state.guessedLetters.includes(letterGuess) === false) {
            state.guessedLetters.push(letterGuess);
            if (mysteryWordArray.includes(letterGuess) === true) {
                correctGuess();
            } else {
                incorrectGuess();
            }
        } else {
            warningsDisplay.innerText = "You already tried that letter. Try another."
        }
        checkVictory();
    }   
})

resetButton.addEventListener("click", function(event) {
    resetGame();
})

hintButton.addEventListener("click", function(event) {
    hint();
})

  /*----- functions -----*/
function appendList() {
    var ul = document.querySelector("#incorrect-letters");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(state.incorrectLetters[state.incorrectLetters.length-1]));
    ul.appendChild(li);
}

function autoGenerateWord() {
    randomWordApi(apiURL);
    setTimeout(() => {
        createMysteryWordArray(mysteryWord);
    }, 1000) 
    switchDisplaysOnWord();
}

function changeCounterBackground(mistakes) {
    if (mistakes === 4) {
        incorrectGuessCounter.style.backgroundColor = "grey";
    } else if (mistakes === 3) {
        incorrectGuessCounter.style.backgroundColor = "black";
    } else if (mistakes === 2) {
        incorrectGuessCounter.style.backgroundColor = "orange";
    } else if (mistakes === 1) {
        incorrectGuessCounter.style.backgroundColor = "red";
    } else if (mistakes === 0) {
        incorrectGuessCounter.style.backgroundColor = "none";
    }
}

function checkVictory() {
    if (fillInTheBlank.innerText.includes("_") === false){
        win();
    }
}

function createMysteryWordArray (word){
    mysteryWordArray = word.split("");
    state.fillInTheBlankArray = [];
    for (let i = 0; i < mysteryWordArray.length; i++) {
        state.fillInTheBlankArray.push("_ ");
    }
    fillInTheBlank.innerHTML = state.fillInTheBlankArray.join("");
    state.incorrectGuessNumber = incorrectGuessInput.value;
}


function correctGuess() {
    let letterSpot = [];
    state.incorrectGuessInARow = 0;
    for (let j = 0; j < mysteryWordArray.length; j++){
        if (letterGuess === mysteryWordArray[j]){
            letterSpot.push(j)
        } 
    }
    for (let k = 0; k < letterSpot.length; k++) {
        state.fillInTheBlankArray[letterSpot[k]] = letterGuess;
    }
    fillInTheBlank.innerHTML = state.fillInTheBlankArray.join("");
}

function countDown() {
    let minutes = Math.floor(state.timeLeft / 60);
    let seconds = state.timeLeft % 60;
    clock.innerText = `${minutes}: ${seconds}`;
    state.timeLeft--;
    if (state.timeLeft === 0) {
        loss()
        clearInterval(intervalID);
        clock.innerText = `0: 00`;
    }
}

function hint() {
    let r = Math.floor(Math.random() * (mysteryWordArray.length))
    console.log("1: " + r);
    console.log(mysteryWordArray[r]);
    if (state.fillInTheBlankArray[r] != "_ ") {
        r = Math.floor(Math.random() * (mysteryWordArray.length))
        console.log("2nd: " + r);
    } 
    if (state.fillInTheBlankArray[r] === "_ ") {
        for (let q = 0; q < mysteryWordArray.length; q++) {
            if (mysteryWordArray[q] === mysteryWordArray[r]){
                state.fillInTheBlankArray[q] = mysteryWordArray[q];
            }
        }
        state.fillInTheBlankArray[r] = mysteryWordArray[r];
        fillInTheBlank.innerHTML = state.fillInTheBlankArray.join("");
    }
    checkVictory();
    hintButton.style.display = "none";
}

function incorrectGuess() {
    state.incorrectLetters = [];
    state.incorrectLetters.push(letterGuess);
    appendList();
    state.incorrectGuessNumber--;
    state.incorrectGuessInARow++;
    rocketDisplayCheck(state.incorrectGuessNumber);
    changeCounterBackground(state.incorrectGuessNumber);
    guessedInfoText.style.display = "none";
    incorrectGuessCounter.innerText = `${state.incorrectGuessNumber}`;
    if (state.incorrectGuessInARow === 2) {
        hintButton.style.display = "block";
    }
}

function loss() {
    warningsDisplay.innerText = `You were trying to guess "${mysteryWord}".`;
    lossMessage.style.display = "block";
    letterGuessInput.disabled = true;
    letterGuessMessage.style.display = "none";
    hintButton.style.display = "none";
    reset.style.display = "block";
    rocketPicture.setAttribute("src", "./images/rocketgif.gif");
    opponent.style.display = "none"
    clearInterval(intervalID);
}

function playComputer() {
    autoGenerateWord();
    opponent.innerText = "Your opponent is the computer.";
    if (state.timed === true) {
        intervalID = setInterval(countDown, 1000);
    }
}

function randomWordApi (url) {
    fetch(url,
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
    resetVariables();
    resetHide();
    letterGuessMessage.style.display = "block";
    guessedInfoText.style.display = "block";
    letterGuessInput.disabled = false;
    clearInterval(intervalID);
    incorrectGuessCounter.innerText = `${state.incorrectGuessNumber}`;
    incorrectGuessCounter.style.backgroundColor = "rgba(128, 128, 128, .2)"
    if (state.botPlay === true) {
        playComputer();
    }
}

function resetHide() {
    mysteryWordInput.style.display = "";
    warningsDisplay.innerText = "";
    letterGuessForm.style.display = "";
    fillInTheBlank.style.display = "";
    incorrectGuessCounter.innerText = "";
    fillInTheBlank.innerHTML = "";
    reset.style.display = "none";
    lossMessage.style.display = "none";
    incorrectGuessCounter.style.backgroundColor = "none";
    document.querySelector("#incorrect-letters").innerText = "";
    clock.innerText = "";
    hintButton.style.display = "none";
    mysteryWordInput.value = ""//Bug: after player 2 succeeds and then resets the game, the mystery word input box defaults to showing previous mystery word as cached chars. How to have it default back to blank input box?
    rocketPicture.setAttribute("src", "./images/blank.png");
}

function resetVariables() {
    mysteryWord, mysteryWordArray, letterGuess = undefined;
    state.guessedLetters = [];  
    state.incorrectGuessNumber = incorrectGuessInput.value;
    state.timeLeft = 120;
    state.incorrectGuessInARow = 0;
}

function rocketDisplayCheck(mistakes) {
    if (mistakes === 4){
        rocketPicture.setAttribute("src", "./images/one.png");
    } else if (mistakes === 3) {
        rocketPicture.setAttribute("src", "./images/two.png");
    } else if (mistakes === 2) {
        rocketPicture.setAttribute("src", "./images/three.png");
    } else if (mistakes === 1) {
        rocketPicture.setAttribute("src", "./images/four.png");
    } else if (mistakes === 0) {
        loss();
    }
}

function setBotOff() {
    state.botPlay = false;
    opponent.innerText = "";
}

function setBotOn() {
    state.botPlay = true;
}

function setTimedFalse() {
    state.timed = false;
    countdownText.innerText = "No timer for this game";
}

function setTimedTrue() {
    state.timed = true;
}

function switchDisplaysOnWord() {
    mysteryWordInput.style.display = "none";
    warningsDisplay.innerText = "";
    letterGuessForm.style.display = "block";
    fillInTheBlank.style.display = "block";
    incorrectGuessCounter.innerText = `${state.incorrectGuessNumber}`;
}

function turnModalOn() {
    modal.style.display = "";
}

function win() {
    warningsDisplay.innerText = "Nice work! You stopped the astronaut from stealing the recipe to the galaxy's best croissants and saved the day.";
    letterGuessInput.disabled = true;
    reset.style.display = "block";
    clearInterval(intervalID);
    hintButton.style.display = "none";
}