const cells = document.querySelectorAll("[data-cell]");
const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");

let currentPlayer = 'X';
let gameState = Array(9).fill('');
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

const handleClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || checkWin()) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusMessage.textContent = `Player ${currentPlayer} Wins! 🎉`;
        return;
    } else if (!gameState.includes('')) {
        statusMessage.textContent = 'Draw! 😅';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
};

const checkWin = () => {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
};

const resetGame = () => {
    gameState.fill('');
    currentPlayer = 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', resetGame);

statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
