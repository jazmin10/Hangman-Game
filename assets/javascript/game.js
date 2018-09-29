// HANGMAN-GAME

// ============ GLOBAL VARIABLES ============
	let wins = 0, guessesLeft = 0, currentWord = [],
		currentDisplay = [], wrongGuesses = [],
		lettersGuessed = [], index = 0, 
		placeholderPicture = `./assets/images/superheroes.jpg`;

	// hangmanGame object: contains game setup
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
			src: `./assets/images/Wolverine.jpg`
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
		},

		// Display instructions to the user
		displayInstructions: function(message) {
			document.querySelector(`#instructions`).innerHTML = message;
		},

		// Display image as either placeholder OR photo of answer
		displayImage: function(imgSource) {
			// document.querySelector(`#image`).innerHTML = `<img src=${imgSource} alt="superheroe">`;

			if (imgSource === placeholderPicture) {
				document.querySelector(`#image`).innerHTML = `<img src=${imgSource}
					alt="superheroe" class="placeholder">`;
				return;
			}

			document.querySelector(`#image`).innerHTML = `<img src=${imgSource} alt="superheroe">`;
		},

		// Display answer
		displayAnswer: function(str) {
			document.querySelector(`#answer`).innerHTML = str;
		},

		// Check if an user has won or lost
		checkWinLoss: function() {
			let wordImage = this.wordsToGuess[index].src;

			// If the user guessed the word, notify the user they won the round
			if (currentDisplay.indexOf(` _ `) === -1) {
				wins++;

				this.displayInstructions(`You won! Press any key to continue`);
				this.displayImage(wordImage);
				this.displayAnswer(this.wordsToGuess[index].word);
				this.displayWins();
			}
			// If the user did not guess the word, notify the user they lost the round
			else if (guessesLeft === 0) {
				this.displayInstructions(`You lost. Press any key to continue`);
				this.displayImage(wordImage);
				this.displayAnswer(this.wordsToGuess[index].word);
			}
		},

		// Advance to the next game's round
		nextRound: function() {
			// Increase index by 1 to move to the next word
			index++;

			// Reset variables for the next round
			currentWord = [];
			currentDisplay = [];
			wrongGuesses = [];
			lettersGuessed = [];
			this.displayAnswer(``);
			startGame();
		},

		// End the game
		endGame: function() {
			this.displayInstructions(`END OF GAME`);
			// add end-game class to #game for styling
			document.querySelector(`#game`).classList.add(`end-game`);

			// Remove everything except instructions message and wins
			document.querySelector(`#currentWord`).innerHTML = ``;
			document.querySelector(`#numberGuesses`).innerHTML = ``;
			document.querySelector(`#lettersGuessed`).innerHTML = ``;
		}
	}


// ============ FUNCTIONS ============

	// Initialize the game by...
	let startGame = () => {
	
		// setting up game
		hangmanGame.setCurrentWord();
		hangmanGame.setCurrentDisplay();
		hangmanGame.setNumberGuesses();

		// rendering the initial game
		hangmanGame.displayHangmanWord();
		hangmanGame.displayWins();
		hangmanGame.displayGuessesLeft();
		hangmanGame.displayWrongGuesses();
		hangmanGame.displayImage(placeholderPicture);
		hangmanGame.displayInstructions(`START GUESSING...`);
	};

	// Checks to determine the next step in the game
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
			
			hangmanGame.checkWinLoss();
		}
		// If the round is over...
		else {
			// move on to the next round
			if (index < hangmanGame.wordsToGuess.length - 1) {
				hangmanGame.nextRound();
			}
			// or finish the game
			else {
				hangmanGame.endGame();
			}

		}
	};

// ============ MAIN PROCESSES ============

	// Start the game
	startGame();

	// When a key is pressed...
	document.onkeyup = gameLogic;











