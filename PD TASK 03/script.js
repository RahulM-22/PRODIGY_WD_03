const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameState = Array(9).fill('');
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    if (checkForWinner()) {
        gameStatus.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (isDraw()) {
        gameStatus.innerText = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerText = `Player ${currentPlayer}'s Turn`;
}

function checkForWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function isDraw() {
    return gameState.every(cell => cell !== '');
}

function restartGame() {
    currentPlayer = 'X';
    gameState = Array(9).fill('');
    gameActive = true;
    gameStatus.innerText = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => (cell.innerText = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
