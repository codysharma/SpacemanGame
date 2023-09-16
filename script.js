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
const opponent = document.getElementById('opponent');
let letterGuessForm = document.querySelector("#letter-guess-form")
let letterGuessInput = document.querySelector("#letter-guess")
const letterGuessMessage = document.getElementById('letter-guess-message');
let letterGuess;
let fillInTheBlank = document.querySelector("#fill-in-the-blank");
let fillInTheBlankArray = [];
let guessedLetters = [];
let incorrectLetters = [];
let incorrectGuessCounter = document.querySelector("#counter");
let incorrectGuessNumber = 5;
const rocketPicture = document.getElementById('rocket-picture');
const lossMessage = document.getElementById('loss-message');

//reset variables
let reset = document.querySelector("#reset");
let resetButton = document.querySelector("#reset-button");

//modal variables
let closeModalButton = document.querySelector("#close-modal")
let modal = document.querySelector("#modal")
let modalToggle = document.querySelector("#settings-button");
// let botPlayToggle = document.querySelector("#yes-computer");
let botPlay = true;
// const personPlayToggle = document.querySelector('#no-computer');
// let timerOn = document.querySelector("#timer-toggle-on");
// let timerOff = document.querySelector("#timer-toggle-off");
let timed = true;
const clock = document.getElementById('countdown-clock');
const countdownText = document.getElementById('countdown-text');
let incorrectGuessInput = document.querySelector("#incorrect-guess-number");
let timeLeft = 120;
let intervalID;
const sizeWord = document.getElementById('size-word');
const sizePhrase = document.getElementById('size-phrase');

//disabling options until ready
// botPlayToggle.disabled = true;
// personPlayToggle.disabled = true;
// timerOn.disabled = true;
// timerOff.disabled = true;
sizeWord.disabled = true;
sizePhrase.disabled = true;
// incorrectGuessInput.disabled = true;

console.log("outside " + mysteryWord);


  /*----- cached elements  -----*/
randomWordApi(apiURL);


  /*----- event listeners -----*/
modal.style.display = "none";
//will re-add this once testing is complete to autoload
// modalTextBox.addEventListener("loadedmetadata", function(event) {
//     event.preventDefault();
//     modal.style.display = "none"
// })

closeModalButton.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("line 86 " + mysteryWord);
    modal.style.display = "none";
    resetGame();
    console.log("line 89");
    if (botPlay === false) {
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
    if (timed === true) {
        intervalID = setInterval(countDown, 1000);
    }
})

letterGuessInput.addEventListener("input", function(event) {
    event.preventDefault();
    console.log("3" + mysteryWord);
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
                console.log("4" + mysteryWord);
            } else {
                incorrectGuess();
                console.log("5" + mysteryWord);
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
    console.log("8" + mysteryWord);
    setTimeout(createMysteryWordArray(mysteryWord), 100);
    console.log("9" + mysteryWord);
    switchDisplaysOnWord();
    incorrectGuessNumber = incorrectGuessInput.value;
}

function playComputer() {
    console.log("1" + mysteryWord);
    autoGenerateWord();
    console.log("2" + mysteryWord);
    opponent.innerText = "Your opponent is the computer.";
    if (timed === true) {
        intervalID = setInterval(countDown, 1000);
    }
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

function countDown() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    clock.innerText = `${minutes}: ${seconds}`;
    timeLeft--;
    if (timeLeft === 0) {
        loss()
        clearInterval(intervalID);
    }
}

function rocketDisplayCheck(counter) {
    if (counter === 4){
        rocketPicture.setAttribute("src", "./images/one.png");
    } else if (counter === 3) {
        rocketPicture.setAttribute("src", "./images/two.png");
    } else if (counter === 2) {
        rocketPicture.setAttribute("src", "./images/three.png");
    } else if (counter === 1) {
        rocketPicture.setAttribute("src", "./images/four.png");
    } else if (counter === 0) {
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
    incorrectGuessCounter.innerText = `Parts of the ship left - ${incorrectGuessNumber}`;
    rocketDisplayCheck(incorrectGuessNumber);
}

function loss() {
    console.log("6" + mysteryWord);
    warningsDisplay.innerText = `You were trying to guess "${mysteryWord}".`;
    lossMessage.style.display = "block";
    letterGuessInput.disabled = true;
    letterGuessMessage.style.display = "none";
    reset.style.display = "block";
    rocketPicture.setAttribute("src", "./images/rocketgif.gif");
    clearInterval(intervalID);
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
    console.log("01" + mysteryWord);
    resetVariables();
    resetErase();
    reset.style.display = "none";
    lossMessage.style.display = "none";
    letterGuessMessage.style.display = "block";
    letterGuessInput.disabled = false;
    clearInterval(intervalID);
    if (botPlay === true) {
        playComputer();
    }
}

function resetErase() {
    mysteryWordInput.style.display = "";
    warningsDisplay.innerText = "";
    letterGuessForm.style.display = "";
    fillInTheBlank.style.display = "";
    incorrectGuessCounter.innerText = "";
    fillInTheBlank.innerHTML = "";
    document.querySelector("#incorrect-letters").innerText = "";
    clock.innerText = "";
    mysteryWordInput.value = ""//Bug: after player 2 succeeds and then resets the game, the mystery word input box defaults to showing previous mystery word as cached chars. How to have it default back to blank input box?
    rocketPicture.setAttribute("src", "./images/blank.png");
}

function resetVariables() {
    mysteryWord, mysteryWordArray, letterGuess = undefined;
    guessedLetters = [];  
    incorrectGuessNumber = 5;
    timeLeft = 120;
}

function switchDisplaysOnWord() {
    mysteryWordInput.style.display = "none"
    warningsDisplay.innerText = "";
    letterGuessForm.style.display = "block";
    fillInTheBlank.style.display = "block";
    incorrectGuessCounter.innerText = `Parts of the ship left - ${incorrectGuessNumber}`;
}

function setBotOn() {
    botPlay = true;
}

function setBotOff() {
    botPlay = false;
    opponent.innerText = "";
}

function setTimedTrue() {
    timed = true;
}

function setTimedFalse() {
    timed = false;
    countdownText.innerText = "No timer for this game";
}

function turnModalOn() {
    modal.style.display = "";
}

function win() {
    warningsDisplay.innerText = "Nice work! You stopped the astronaut from stealing the recipe to the galaxy's best croissants and saved the day.";
    letterGuessInput.disabled = true;
    reset.style.display = "block";
    clearInterval(intervalID);
}