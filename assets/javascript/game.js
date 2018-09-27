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
		currentDisplay = [], wrongLettersGuessed = [],
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

		// Displays hangman word to the screen
		displayHangmanWord: function() {
			let wordToDisplay = currentDisplay.join(``);
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
			let stringWrongGuesses = wrongLettersGuessed.join(` , `);
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

// ============ MAIN PROCESSES ============

	// Start the game
	startGame();











