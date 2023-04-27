let currentPlayer = "red";
let thereIsAWinner = false;
let redScore = 0;
let blueScore = 0;

const cells = document.querySelectorAll("td");
const resetBtn = document.getElementById("reset-btn");
const redScoreDisplay = document.getElementById("red-score");
const blueScoreDisplay = document.getElementById("blue-score");

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetGame);

function handleCellClick(event) {
    const cell = event.target;
    cell.classList.add(currentPlayer);
    cell.removeEventListener("click", handleCellClick);
    checkWinner();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "red" ? "blue" : "red";
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningCombos.forEach((combo) => {
        if (cells[combo[0]].classList.contains(currentPlayer) &&
            cells[combo[1]].classList.contains(currentPlayer) &&
            cells[combo[2]].classList.contains(currentPlayer)) {
            alert(`${currentPlayer} gano!`);
            thereIsAWinner = true
            disableCells();
            updateScore();
        }
    });

    if (!thereIsAWinner) {
        if ([...cells].every((cell) => cell.classList.length > 0)) {
            alert("Es un empate!");
        }
    }
}

function disableCells() {
    cells.forEach((cell) => {
        cell.removeEventListener("click", handleCellClick);
    });
}

function resetGame() {
    cells.forEach((cell) => {
        cell.classList.remove("red", "blue");
        cell.addEventListener("click", handleCellClick);
    });
    currentPlayer = "red";
    thereIsAWinner = false;
}

function updateScore() {
    if (currentPlayer === "red") {
        redScore++;
        redScoreDisplay.textContent = redScore;
    } else {
        blueScore++;
        blueScoreDisplay.textContent = blueScore;
    }
}
