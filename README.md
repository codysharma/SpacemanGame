# SpacemanGame

An update on the hangman game, this version of Spaceman can be played either by 2 players or solo with a randomly generated word.

Some features of this game:  
-Random word pulled via API for playing against the computer  
-An option for timer on/off  
-A choice of how many mistake letters to allow  
-A hint button appears after 2 consecutive mistaken guesses  
-A reset button at the end of each round regardless of victory to play again with the current conditions  
-Checkers to prevent spaces or non-alpha characters when a player inputs the mystery word  
-Dynamic content and graphics based on stimuli  

![image](https://github.com/codysharma/SpacemanGame/assets/123990673/6541e848-dcc6-4d52-83e9-0645a4027c67)

![image](https://github.com/codysharma/SpacemanGame/assets/123990673/ce4f4fd4-535b-4adc-850d-675f6346a218)

Tech used: Javascript, CSS, HTML, JSON, API integration

Base:  
X Take text input for mystery word.  
X Take character input as guesses to mystery word.    
X Create display showing the number of characters in mystery word as empty spaces.  
X Display incorrect guesses somewhere on the page.  
X Display correct guesses in the appropriate spot in the display which will dynamically update.  
X Countdown variable to auto update after incorrect guesses.  
X Game end events to happen automatically after countdown elapses or word completed.  
X Make modal for instructions to appear on load. Will eventually also hold the beginning of games options.  
X Find way to stop already guessed letters from counting  

Stretch Goals:  
X Be able to select auto-play, so the computer chooses the mystery word for the player to guess.  
X Display timer (TODO - how to get the increments every 1s to update on the DOM?).  
X Small, static image builds as the countdown variable increments.  
X Choose and incorporate font.  
X Player choice on how many turns before end of game.  
X Make functions to organize code architecture  
X Make game state object at beginning  
X Pull random word API for bot play.  
X Create a hint function to appear after certain number consecutive incorrect guesses.  
X Decorate the liftoff counter with colored text, background div, etc.  
X Download gif of image to make the rocket have movement.  

Future potential items:  
At the beginning of a round, select the option to enter a word or phrase with spaces.   
Save timed results and display session history.  
Parse timed results by difficulty/char length to make the data more comparable.  
Pull a spellcheck API. Tried to find one, but found ones geared towards prose rather than single words.  
