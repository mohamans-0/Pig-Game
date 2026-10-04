'use strict';

// Selecting elements :
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const palyer0 = document.querySelector('.player--0');
const palyer1 = document.querySelector('.player--1');
const scoreOfPalyer0 = document.querySelector('#score--0');
const scoreOfPalyer1 = document.querySelector('#score--1');

const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  palyer0.classList.toggle('player--active');
  palyer1.classList.toggle('player--active');
};

// Starting conditions :
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// rolling dice functionality :
btnroll.addEventListener('click', function () {
  if (playing) {
    // 1.Henerating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Checked for rolled 1
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player score is >= 100
    if (scores[activePlayer] >= 20) {
      // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      btnhold;
    } else {
      switchPlayer();
    }
  }
});

btnnew.addEventListener('click', function () {
  newGame();
});

const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  scoreOfPalyer0.textContent = 0;
  scoreOfPalyer1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  palyer1.classList.remove('player--active');
  palyer0.classList.add('player--active');

  if (
    palyer0.classList.contains('player--winner') ||
    palyer1.classList.contains('player--winner')
  ) {
    if (activePlayer === 0) {
      palyer0.classList.remove('player--winner');
    } else if (activePlayer === 1) {
      palyer1.classList.remove('player--winner');
    }
  }
};
