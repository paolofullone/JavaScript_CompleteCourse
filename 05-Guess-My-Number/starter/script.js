'use strict';
// this querySelector is a method to retrieve information from the html file
// the 'message' is a paragragh named in a class
// console.log(document.querySelector('.message').textContent);

//071 - whats the DOM and DOM Manipulation
// Document Object Model - structured representation of HTML documents.
// DOM is a conecting point between JS and HTML.

// 072 - selecting and Manipulating elements.

// setting the content of an element
/*
document.querySelector('.message').textContent = '🎉 Correct Number';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value); // this returns an empty line in console, we don't have a value there yet

document.querySelector('.guess').value = 23; // setting the guess value to 23.

console.log(document.querySelector('.guess').value); // now we can see 23...

// 073 Handling click events

// this will do something when we click on check, to begin we just log the number informed.
// we have to pass the name of the event we will listen, then a function.
// the function is not called anywhere, JS will call it as soon as the event happens.

// document.querySelector('.check').addEventListener('click', function () {
//   const guess = Number(document.querySelector('.guess').value);
//   console.log(guess, typeof guess);

//   // if we click in check! with empty value we will get 0 as a falsy value.
//   if (!guess) {
//     // if no value inserted in guess...
//     console.log(
//       (document.querySelector('.message').textContent = '⛔️ No Number!')
//     );
//   }
// });

// 074 Implementing the Game Logic
// 1 - define secret number;
// 2 - log if the guess is higher or lower
// 3 - log if the guess is right
// 4 - score should decrease at each mistake.
// 5 - set the score to zero if 20+ attempts.
// 6 - some duplicate code to eliminate.

// secret number must be defined outside the function
// Math.random gives a number between 0 and 1, times 20, trunc eliminates the fraction, so we need +1 to get 20.
const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

//while we test the logic, let's show the magic number instead of ?.
document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // if we click in check! with empty value we will get 0 as a falsy value.
  if (!guess) {
    // if no value inserted in guess...
    console.log(
      (document.querySelector('.message').textContent = '⛔️ No Number!')
    );
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number';
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Too High!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too Low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});

// 075 Manipulating CSS Styles.mp4
// Manipulating css
// change the background color to green when player wins
// Make the number box higher

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

//while we test the logic, let's show the magic number instead of ?.
document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // when there's no input
  if (!guess) {
    // if no value inserted in guess...
    console.log(
      (document.querySelector('.message').textContent = '⛔️ No Number!')
    );

    //when player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number';
    // setting the bg color green
    document.querySelector('body').style.backgroundColor = '#60b347';
    // increasing the font size of the number box, it has to be inside a string, we searched in css and found it has 15 rem before wining.
    document.querySelector('.number').style.width = '30rem';

    // when guess is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Too High!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }

    // when guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too Low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});


// 076 - Coding Challenge 1
// Implement the play again button.
// move the code that shows the secret number to the block where player wins

// Coding Challenge #1


Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀


let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // when there's no input
  if (!guess) {
    // if no value inserted in guess...
    console.log(
      (document.querySelector('.message').textContent = '⛔️ No Number!')
    );

    //when player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number';
    // setting the bg color green
    document.querySelector('body').style.backgroundColor = '#60b347';
    // increasing the font size of the number box, it has to be inside a string, we searched in css and found it has 15 rem before wining.
    document.querySelector('.number').style.width = '30rem';
    // displaying the secret number.
    document.querySelector('.number').textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // when guess is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Too High!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }

    // when guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too Low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Setting the game to initial conditions when click on Again!
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
*/

//078 Refactoring Our Code_ The DRY Principle.mp4

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// setting a function to replace all the messages set all over the code.
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// setting a function to scorer:
const updateScore = function (newScore) {
  document.querySelector('.score').textContent = newScore;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // when there's no input
  if (!guess) {
    // if no value inserted in guess...
    // document.querySelector('.message').textContent = '⛔️ No Number!')
    displayMessage('⛔️ No Number!');

    //when player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number';
    displayMessage('🎉 Correct Number');
    // setting the bg color green
    document.querySelector('body').style.backgroundColor = '#60b347';
    // increasing the font size of the number box, it has to be inside a string, we searched in css and found it has 15 rem before wining.
    document.querySelector('.number').style.width = '30rem';
    // displaying the secret number.
    document.querySelector('.number').textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    // now if the guess is diferent then the secret number we use a ternary operator do display the message
    // and keep everything else.
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      // document.querySelector('.score').textContent = score;
      updateScore(score);
    } else {
      // document.querySelector('.message').textContent = '💥 You lost the game!';
      displayMessage('💥 You lost the game!');
      // document.querySelector('.score').textContent = 0;
      updateScore(0);
    }
  }
});

// when guess is too high
// } else if (guess > secretNumber) {
//   if (score > 1) {
//     document.querySelector('.message').textContent = '📈 Too High!';
//     score--;
//     document.querySelector('.score').textContent = score;
//   } else {
//     document.querySelector('.message').textContent = '💥 You lost the game!';
//     document.querySelector('.score').textContent = 0;
//   }

//   // when guess is too low
// } else if (guess < secretNumber) {
//   if (score > 1) {
//     document.querySelector('.message').textContent = '📉 Too Low!';
//     score--;
//     document.querySelector('.score').textContent = score;
// } else {
//   document.querySelector('.message').textContent = '💥 You lost the game!';
//   document.querySelector('.score').textContent = 0;
// }

// Setting the game to initial conditions when click on Again!
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  // document.querySelector('.score').textContent = score;
  updateScore(score);
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
