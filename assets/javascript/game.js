// HOMEWORK #3: Hangman-Game

// var options = ["BATMAN", "SUPERMAN", "FLASH", "WOLVERINE", "SPIDER-MAN", "THOR"];
// var wins = 0;
		
// function hangman(guessWord) {
// 	var word = guessWord;
// 	var blankArr = [];
// 	var guessCount = word.length + 4;
// 	var wrongGuesses = [];
			
// 	for(i = 0; i < word.length; i++){
// 		blankArr.push(" _ ");
// 	}

// 	document.getElementById("currentWord").innerHTML = "Current Word:<br/>" + blankArr.join(" ");

// 	document.getElementById("numberGuesses").innerHTML = "Guesses Left:<br/> " + guessCount;

// 	document.getElementById("wins").innerHTML = "Wins: " + wins;

// 	document.getElementById("lettersGuessed").innerHTML = "Letters already guessed: " + wrongGuesses;

// 	document.onkeyup = function(event){
// 		var guess = event.key.toUpperCase();

// 		var indexGuess = word.indexOf(guess);
// 		// If there are guesses left AND the word hasn't been guessed...
// 		if((guessCount > 0) && (blankArr.indexOf(" _ ") > -1) ) {
// 			// If the letter has NOT been guessed already...
// 			if((blankArr.indexOf(guess) === -1) && (wrongGuesses.indexOf(guess) === -1)){
// 				// If the guess is incorrect...
// 				if(indexGuess === -1){
// 					wrongGuesses.push(guess);
// 					guessCount = guessCount - 1;
// 					// If there is a loss...
// 					if(guessCount === 0){
// 						blankArr = [];
// 						guessCount = word.length + 4;
// 						wrongGuesses = [];
// 						hangman(options[Math.floor(Math.random()*options.length)]);
// 					}
// 				}
// 				// If the guess is correct...
// 				else{
// 					// Pushes letter to its position(s)
// 					while (indexGuess > -1) {
// 						blankArr[indexGuess] = " " + guess + " ";
// 						var indexGuess = word.indexOf(guess, indexGuess + 1);
// 					}

// 					document.getElementById("currentWord").innerHTML = "Current Word:<br/>" + blankArr.join(" ");
// 					// If all letters are guessed...
// 					if(blankArr.indexOf(" _ ") === -1){
// 						wins++;
// 						blankArr = [];
// 						guessCount = word.length + 4;
// 						wrongGuesses = [];
// 						document.getElementById("word").innerHTML = word;
// 						hangman(options[Math.floor(Math.random()*options.length)]);
// 					}
// 				}
// 			}

// 			document.getElementById("lettersGuessed").innerHTML = "Letters already guessed: " + wrongGuesses;

// 			document.getElementById("numberGuesses").innerHTML = "Guesses Left:<br/> " + guessCount;					
// 		}			
// 	};
// }

// // Calling hangman() function
// hangman(options[Math.floor(Math.random()*options.length)]);

// ============ GLOBAL VARIABLES ============
	let wins = 0, guessesLeft = 0, currentWord = [],
		currentDisplay = [], wrongGuesses = [],
		lettersGuessed = [], index = 0, 
		placeholderPicture = `<img src="./assets/images/superheroes.jpg">`;

	// hangmanGame object: 
		// Using function() syntax instead of arrow functions because 
		// we want this to be the hangmanGame object, NOT the window.
		// With arrow functions we have lexical scoping
	let hangmanGame = {

		// holds array of words that need to be guessed
		wordsToGuess: [{
			word: `BATMAN`,
			src: `./assets/images/Batman.jpg`
		}, {
			word: `SUPERMAN`,
			src: `./assets/images/Superman.jpg`
		}, {
			word: `FLASH`,
			src: `./assets/images/Flash.jpg`
		}, {
			word: `WOLVERINE`,
			src: `./assets/images/Wolvering.jpg`
		}, {
			word: `SPIDER-MAN`,
			src: `./assets/images/Spider-Man.jpg`
		}, {
			word: `THOR`,
			src: `./assets/images/Thor.jpg`
		}],

		// Sets currentWord array to the hangman word that is currently being guessed
		setCurrentWord: function() {
			let word = this.wordsToGuess[index].word;
			currentWord = word.split(``);
		},

		// Set initial number of guesses an user has to guess a word
		setNumberGuesses: function() {
			guessesLeft = currentWord.length + 3;
		},

		// Sets the initial currentDisplay array by replacing letters of the
		// current hangman word with " _ "
		setCurrentDisplay: function() {
			for (i = 0; i < currentWord.length; i++) {
				currentDisplay.push(` _ `);
			}
		},

		// Adds all guesses to the lettersGuessed array
		setLettersGuessed: function(guess) {
			lettersGuessed.push(guess);
		},

		// Add a wrong guess to the wrongGuesses array
		setWrongGuesses: function(wrongGuess) {
			wrongGuesses.push(wrongGuess);
		},

		// Displays hangman word to the screen
		displayHangmanWord: function() {
			let wordToDisplay = currentDisplay.join(` `);
			document.querySelector(`#currentWord`).innerHTML = `Current Word:<br/> ${wordToDisplay}`;
		},

		// Display current number of wins
		displayWins: function() {
			document.querySelector(`#wins`).innerHTML = `Wins: ${wins}`;
		},

		// Display number of guesses left
		displayGuessesLeft: function() {
			document.querySelector(`#numberGuesses`).innerHTML = `Guesses Left:<br/> ${guessesLeft}`
		},

		// Display guesses that were wrong
		displayWrongGuesses: function() {
			let stringWrongGuesses = wrongGuesses.join(` , `);
			document.querySelector(`#lettersGuessed`).innerHTML = `Letters already guessed: ${stringWrongGuesses}`;
		} 
	}


// ============ FUNCTIONS ============

	// Initialize the game by...
	let startGame = () => {

		// setting placeholder picture
		document.querySelector(`#image`).innerHTML = placeholderPicture;
		// Setting initial instructions
		document.querySelector(`#instructions`).innerHTML = `START GUESSING...`;

		// setting up game
		hangmanGame.setCurrentWord();
		hangmanGame.setCurrentDisplay();
		hangmanGame.setNumberGuesses();

		// rendering the initial game
		hangmanGame.displayHangmanWord();
		hangmanGame.displayWins();
		hangmanGame.displayGuessesLeft();
		hangmanGame.displayWrongGuesses();
	};

	let gameLogic = event => {

		// If the round is NOT over (there are guesses left and the word hasn't been guessed)...
		if (guessesLeft > 0 && currentDisplay.indexOf(` _ `) !== -1) {

			let userGuess = event.key.toUpperCase();

			// if the userGuess has already been guessed, do nothing and exit function
			if (lettersGuessed.indexOf(userGuess) !== -1) {
				return;
			}

			// add the  userGuess to the list of letters guessed
			hangmanGame.setLettersGuessed(userGuess);

			// If the guess is correct, then display all instances of the guess 
			// in the hangman word
			if (currentWord.indexOf(userGuess) !== -1) {

				// Store the first instance of the userGuess
				let userGuessIndex = currentWord.indexOf(userGuess);

				// While there is an instance of the userGuess... 
				while (userGuessIndex !== -1) {
					// set the letter in the appropiate index
					currentDisplay[userGuessIndex] = userGuess;
					// continue the search AFTER the last instance 
					userGuessIndex = currentWord.indexOf(userGuess, userGuessIndex + 1);
				}

				hangmanGame.displayHangmanWord();
			}
			// If a guess is wrong update list of wrong guesses and guesses left
			else {
				hangmanGame.setWrongGuesses(userGuess);
				guessesLeft--;

				hangmanGame.displayWrongGuesses();
				hangmanGame.displayGuessesLeft();
			}
			
		}
	};

// ============ MAIN PROCESSES ============

	// Start the game
	startGame();

	// When a key is pressed...
	document.onkeyup = gameLogic;











