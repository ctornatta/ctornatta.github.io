'use strict';
//https://pig-game-v2.netlify.app/

/* Objects */

//create a object called Player
function Player(name, overlaySel, totalScoreId, currentScoreId) {
  this.name = name;
  this.overlaySel = overlaySel;
  this.totalScoreId = totalScoreId;
  this.currentScoreId = currentScoreId;
  this.isActive = false;
  this.totalScore = 0;
  this.currentRoundScore = 0;
  //this.overlayclassList = overlaySel.classList;
}

/* All Functions go here */
const f_makeActivePlayer = function (player) {
  if (player == player1) {
    player1.isActive = true;
    player1.overlaySel.classList.add('player--active');
    player2.isActive = false;
    player2.overlaySel.classList.remove('player--active');
  } else if (player == player2) {
    player2.isActive = true;
    player2.overlaySel.classList.add('player--active');
    player1.isActive = false;
    player1.overlaySel.classList.remove('player--active');
  }

  return player;
};

const f_switchActivePlayer = function () {
  diceSelector.classList.add('hidden');
  activePlayer.currentRoundScore = 0;
  if (activePlayer == player1) {
    activePlayer = f_makeActivePlayer(player2);
  } else if (activePlayer == player2) {
    activePlayer = f_makeActivePlayer(player1);
  }
  return activePlayer;
};

const f_rollDice = function () {
  diceSelector.classList.remove('hidden');
  const roll = Math.trunc(Math.random() * 6 + 1);

  diceSelector.src = `dice-${roll}.png`;

  //Update Player current Score
  //Update screen function!?
  if (roll == 1) {
    //activePlayer.currentRoundScore = 0;
    f_switchActivePlayer();
  } else {
    activePlayer.currentRoundScore += roll;
  }
  f_updateScreen();
  return roll;
};

const f_NewGame = function () {
  activePlayer = f_makeActivePlayer(player1);
  player1.totalScore = 0;
  player1.currentRoundScore = 0;
  player2.totalScore = 0;
  player2.currentRoundScore = 0;
  diceSelector.classList.add('hidden');
  f_updateScreen();
};

const f_updateScreen = function () {
  player1.totalScoreId.textContent = player1.totalScore;
  player1.currentScoreId.textContent = player1.currentRoundScore;
  player2.totalScoreId.textContent = player2.totalScore;
  player2.currentScoreId.textContent = player2.currentRoundScore;
};

const f_hold = function () {
  activePlayer.totalScore += activePlayer.currentRoundScore;
  if (activePlayer.totalScore >= 100) {
    console.log(`${activePlayer.name} Wins!!`);
    f_NewGame();
    return;
  }
  f_switchActivePlayer();
  f_updateScreen();
};

/*   END OF FUNCTIONS    */

/* Global variables*/
let activePlayer;
let dice;
let player1 = new Player(
  'Player 1',
  document.querySelector('.player--0'),
  document.getElementById('score--0'),
  document.getElementById('current--0')
);

let player2 = new Player(
  'Player 2',
  document.querySelector('.player--1'),
  document.getElementById('score--1'),
  document.getElementById('current--1')
);

/*Global selectors*/
let diceSelector = document.querySelector('.dice');
let btnDiceRoll = document.querySelector('.btn--roll');
let btnNewGame = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');

/* MAIN */
console.log(player1);
console.log(player2);

f_NewGame();
btnDiceRoll.addEventListener('click', f_rollDice);
btnNewGame.addEventListener('click', f_NewGame);
btnHold.addEventListener('click', f_hold);
