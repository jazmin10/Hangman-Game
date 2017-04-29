// HOMEWORK #3: Hangman-Game

var options = ["BATMAN", "SUPERMAN", "FLASH", "WOLVERINE", "SPIDER-MAN", "THOR"];
var wins = 0;
		
function hangman(guessWord) {
	var word = guessWord;
	var blankArr = [];
	var guessCount = word.length + 4;
	var wrongGuesses = [];
			
	for(i = 0; i < word.length; i++){
		blankArr.push(" _ ");
	}

	document.getElementById("currentWord").innerHTML = "Current Word:<br/>" + blankArr.join(" ");

	document.getElementById("numberGuesses").innerHTML = "Guesses Left:<br/> " + guessCount;

	document.getElementById("wins").innerHTML = "Wins: " + wins;

	document.getElementById("lettersGuessed").innerHTML = "Letters already guessed: " + wrongGuesses;

	document.onkeyup = function(event){
		var guess = event.key.toUpperCase();

		var indexGuess = word.indexOf(guess);
		// If there are guesses left AND the word hasn't been guessed...
		if((guessCount > 0) && (blankArr.indexOf(" _ ") > -1) ) {
			// If the letter has NOT been guessed already...
			if((blankArr.indexOf(guess) === -1) && (wrongGuesses.indexOf(guess) === -1)){
				// If the guess is incorrect...
				if(indexGuess === -1){
					wrongGuesses.push(guess);
					guessCount = guessCount - 1;
					// If there is a loss...
					if(guessCount === 0){
						blankArr = [];
						guessCount = word.length + 4;
						wrongGuesses = [];
						hangman(options[Math.floor(Math.random()*options.length)]);
					}
				}
				// If the guess is correct...
				else{
					// Pushes letter to its position(s)
					while (indexGuess > -1) {
						blankArr[indexGuess] = " " + guess + " ";
						var indexGuess = word.indexOf(guess, indexGuess + 1);
					}

					document.getElementById("currentWord").innerHTML = "Current Word:<br/>" + blankArr.join(" ");
					// If all letters are guessed...
					if(blankArr.indexOf(" _ ") === -1){
						wins++;
						blankArr = [];
						guessCount = word.length + 4;
						wrongGuesses = [];
						document.getElementById("word").innerHTML = word;
						hangman(options[Math.floor(Math.random()*options.length)]);
					}
				}
			}

			document.getElementById("lettersGuessed").innerHTML = "Letters already guessed: " + wrongGuesses;

			document.getElementById("numberGuesses").innerHTML = "Guesses Left:<br/> " + guessCount;					
		}			
	};
}

// Calling hangman() function
hangman(options[Math.floor(Math.random()*options.length)]);
