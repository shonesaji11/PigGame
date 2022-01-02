'use strict';

//random 1
//random 2
//random 3
//random 4
//random 5
//random 6
//random 7
//random 8

const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const currentScore = document.querySelectorAll('.current-score');
const totalScore = document.querySelectorAll('.score');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const diceImage = document.getElementById('diceImg');
const diceImgBasePath = "dice-";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

let playerOneScore = 0;
let playerTwoScore = 0;
let current = 0;
let currentPlayer = 0;

function initializeScore() {
    for (let i = 0; i < totalScore.length; i++) {
        totalScore[i].textContent = 0;
        currentScore[i].textContent = 0;
    }
}

function checkGameOver(playerNo, score) {
    if (score >= 10) {
        // display a modal that says which player won and the score attained.
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        document.getElementById('winnerStatement').textContent = `Player ${playerNo + 1} has won !!     Score is ${score} `;
        // closing modal must make the page return back to default state.
    }
}

function defaultState() {
    playerOneScore = 0;
    playerTwoScore = 0;
    current = 0;
    if (currentPlayer) {
        playerOne.classList.add('player--active');
        playerTwo.classList.remove('player--active');
    }
    currentPlayer = 0;
    initializeScore();
}

function TwotoOne() {
    // Steps to perform when player changes from two to one
    currentPlayer = 0;
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
}

function OnetoTwo() {
    // Steps to perform when player changes from one to two
    currentPlayer = 1;
    playerTwo.classList.add('player--active');
    playerOne.classList.remove('player--active');
}

initializeScore();

function roll() {
    return Math.trunc(Math.random() * 6) + 1;
}

rollDice.addEventListener('click', () => {
    let number = roll();
    diceImage.src = diceImgBasePath + number.toString() + ".png";

    if (number != 1) {
        current += number;
        currentScore[currentPlayer].textContent = current;
    } else {
        // check if current players score >= 100 and set current to 0
        current = 0;
        currentScore[currentPlayer].textContent = current;
        if (currentPlayer == 1) {
            TwotoOne();
        } else {
            OnetoTwo();
        }
    }
});

hold.addEventListener('click', () => {
    currentScore[currentPlayer].textContent = 0;
    if (currentPlayer == 1) {
        playerTwoScore += current;
        totalScore[currentPlayer].textContent = playerTwoScore;
        checkGameOver(currentPlayer, playerTwoScore);
        TwotoOne();
    }
    else {
        playerOneScore += current;
        totalScore[currentPlayer].textContent = playerOneScore;
        checkGameOver(currentPlayer, playerOneScore);
        OnetoTwo();
    }
    current = 0;
});

newGame.addEventListener('click', defaultState);

btnCloseModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    defaultState();
})