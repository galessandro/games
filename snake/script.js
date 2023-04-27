const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const CELL_SIZE = 10;
const BOARD_WIDTH = 30;
const BOARD_HEIGHT = 30;
const INITIAL_SNAKE_LENGTH = 4;
const FOOD_COLOR = "red";
const SNAKE_COLOR = "green";
const GAME_SPEED = 100;

let score = 0;
let direction = "right";
let snake = [];
let food = {};

canvas.width = BOARD_WIDTH * CELL_SIZE;
canvas.height = BOARD_HEIGHT * CELL_SIZE;

function initGame() {
    createSnake();
    createFood();
    drawSnake();
    drawFood();
    setInterval(() => {
        clearBoard();
        drawSnake();
        drawFood();
        moveSnake();
    }, GAME_SPEED);
    document.addEventListener("keydown", handleKeyPress);
}

function createSnake() {
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
        snake.push({
            x: i,
            y: 0
        });
    }
}

function drawSnake() {
    ctx.fillStyle = SNAKE_COLOR;
    snake.forEach((cell) => {
        ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
}

function moveSnake() {
    const head = {
        x: snake[0].x + (direction === "right" ? 1 : direction === "left" ? -1 : 0),
        y: snake[0].y + (direction === "down" ? 1 : direction === "up" ? -1 : 0)
    };

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        createFood();
        score++;
        scoreDisplay.textContent = score;
    } else {
        // Remove the last cell of the snake
        snake.pop();
    }

    // Check for collision with wall
    if (head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT) {
        gameOver();
        return;
    }

    // Check for collision with self
    if (snake.some((cell, index) => index > 1 && cell.x === head.x && cell.y === head.y)) {
        gameOver();
        return;
    }

    // Add new head to the front of the snake
    snake.unshift(head);
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * BOARD_WIDTH),
        y: Math.floor(Math.random() * BOARD_HEIGHT)
    };
}

function drawFood() {
    ctx.fillStyle = FOOD_COLOR;
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
}

function gameOver() {
    alert("Game over!");
    document.location.reload();
}

initGame();
