'use strict';
//082 PROJECT #3_ Pig Game.mp4

// diagram made on diagrams.net

// we have to use the hash (#) selector for id's, the (.) is for classes with querySelector, another way is using getElementById
// getElementById is a bit faster if you're selecting thousands of elements.
// Selecting elements
/*
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// setting the scores to 0
score0El.textContent = 0;
score1El.textContent = 0;

let currentScore = 0;

// hiding dice at the beginning of the game
diceEl.classList.add('hidden');

// in order to hide it, we added to css file the .hidden class:
// .hidden {
//   display: none
// }

// 083 Rolling the Dice.mp4

// // added the constants:
// const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');

btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1; // this one is not a global const, we just want to use it when rolling the dice.
  //   console.log(dice); just to check if the number is right when generated
  // 2. display the dice.
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  if (dice !== 1) {
    // we need now to create a variable let with the score. we inserted let currentScore.
    currentScore += dice;
    current0El.textContent = currentScore; // for now we will only assign the current score to player number 1.

    // 3 check for rolled 1, if true switch to next player.
  } else {
  }
});


// 084 Switching the Active Player.mp4
// we have to use the hash (#) selector for id's, the (.) is for classes with querySelector, another way is using getElementById
// getElementById is a bit faster if you're selecting thousands of elements.
// Selecting elements
const player0El = document.querySelector('.player--0'); // we will use this to change the appearance of active player.
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// setting the scores to 0
score0El.textContent = 0;
score1El.textContent = 0;

const scores = [0, 0]; //this are the starting scores of both players.
let currentScore = 0;
let activePlayer = 0;

// hiding dice at the beginning of the game
diceEl.classList.add('hidden');

// in order to hide it, we added to css file the .hidden class:
// .hidden {
//   display: none
// }

// 083 Rolling the Dice.mp4

// // added the constants:
// const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');

btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1; // this one is not a global const, we just want to use it when rolling the dice.
  //   console.log(dice); just to check if the number is right when generated
  // 2. display the dice.
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  if (dice !== 1) {
    // we need now to create a variable let with the score. we inserted let currentScore.
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore; // this replaces the line below:
    // current0El.textContent = currentScore; // for now we will only assign the current score to player number 1.

    // 3 check for rolled 1, if true switch to next player.
  } else {
    // before we change the player we set the current score text content to zero.
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // now we change players and set the score to 0.
    currentScore = 0; // when the player is switched we also need to set the current score to 0.
    activePlayer = activePlayer === 0 ? 1 : 0; // if the active player is zero, turn to 1, else (if the active player is 1) turn it to 0.
    player0El.classList.toggle('player--active'); // the toggle method will remove the class if it exists
    player1El.classList.toggle('player--active'); // or it will add the class if it does not exists.
  }
});


// 085 Holding Current Score.en_US.srt
// we used a playing boolean variable to control the state of the game active-inactive.
// in inactive mode, none of the roll, hold commands are executed.

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// setting the scores to 0
score0El.textContent = 0;
score1El.textContent = 0;

const switchPlayers = function () {
  // before we change the player we set the current score text content to zero.
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // now we change players and set the score to 0.
  currentScore = 0; // when the player is switched we also need to set the current score to 0.
  activePlayer = activePlayer === 0 ? 1 : 0; // if the active player is zero, turn to 1, else (if the active player is 1) turn it to 0.
  player0El.classList.toggle('player--active'); // the toggle method will remove the class if it exists
  player1El.classList.toggle('player--active'); // or it will add the class if it does not exists.
};

const scores = [0, 0]; //this are the starting scores of both players.
let currentScore = 0;
let activePlayer = 0;
let playing = true; // we will use it to finish the game and interrupt the access to buttons roll, hold...

// hiding dice at the beginning of the game
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (playing) {
    // now with the new playing variable, the button roll only will execute something if the playing variable value is true.
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // this one is not a global const, we just want to use it when rolling the dice.
    //   console.log(dice); just to check if the number is right when generated
    // 2. display the dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // we need now to create a variable let with the score. we inserted let currentScore.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // 3 check for rolled 1, if true switch to next player.
    } else {
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // it was not working, we had selected current, but the element indeed is score--
    // console.log('hold button debug');
    // 1. Add current score to the active player's score.
    scores[activePlayer] += currentScore; // the scores are stored in an array, so we use the activePlayer (0 or 1) to identify the player in the array.
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the score is >= 100
    // Finish the game or:
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden'); // removing the dice if we finish the game.
      document
        .querySelector(`.player--${activePlayer}`) // here we used querySelector and forgot about the . on player--${...}. This generated a error in the code.
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player.
      switchPlayers();
    }
  }
});
*/

// 086 Resetting the Game.mp4

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayers = function () {
  // before we change the player we set the current score text content to zero.
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; // when the player is switched we also need to set the current score to 0.
  activePlayer = activePlayer === 0 ? 1 : 0; // if the active player is zero, turn to 1, else (if the active player is 1) turn it to 0.
  player0El.classList.toggle('player--active'); // the toggle method will remove the class if it exists
  player1El.classList.toggle('player--active'); // or it will add the class if it does not exists.
};

// we moved the variables to inside the const init which is a function, so the variables only exists inside the function.
// this caused an error in the page, so we have to declare the variables outside the function w/o values and
// assign the values inside the function, w/o the const or let declarations.
let scores, currentScore, activePlayer, playing;

const init = function () {
  // variables
  scores = [0, 0]; //this are the starting scores of both players.
  currentScore = 0;
  activePlayer = 0;
  playing = true; // we will use it to finish the game and interrupt the access to buttons roll, hold...

  // visible part of the UI
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // player 0 is the active player in the beginning of the game.
  player1El.classList.remove('player--active');
  // hiding dice at the beginning of the game
  diceEl.classList.add('hidden');
};
init();

btnRoll.addEventListener('click', function () {
  // now with the new playing variable, the button roll only will execute something if the playing variable value is true.
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // this one is not a global const, we just want to use it when rolling the dice.
    // 2. display the dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // we need now to create a variable let with the score. we inserted let currentScore.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // 3 check for rolled 1, if true switch to next player.
    } else {
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the active player's score.
    scores[activePlayer] += currentScore; // the scores are stored in an array, so we use the activePlayer (0 or 1) to identify the player in the array.
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the score is >= 100
    // Finish the game or:
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden'); // removing the dice if we finish the game.
      document
        .querySelector(`.player--${activePlayer}`) // here we used querySelector and forgot about the . on player--${...}. This generated an error in the code.
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player.
      switchPlayers();
    }
  }
});

// My solution:

// btnNew.addEventListener('click', function () {
//   // setting the scores and text contents back to 0.
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   scores = [0, 0];
//   // showing the dice again:
//   diceEl.classList.remove('hidden');

//   // removing the winner style:
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');

//   // setting player 1 as active
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
//   playing = true;
// });

btnNew.addEventListener('click', init);
