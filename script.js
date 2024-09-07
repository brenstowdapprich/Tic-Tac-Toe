const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;
    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
    } else if (Array.from(cells).every(cell => cell.textContent)) {
        alert('Draw!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        );
    });
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
