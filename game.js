// game.js

const board = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const upButton = document.getElementById('up-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const scoreElement = document.getElementById('score');
let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 }; // Dirección inicial hacia la derecha
let food = { x: 5, y: 5 };
let score = 0;
let interval = null;
const levels = [200, 150, 100, 50];
let currentLevel = 0;

function startGame() {
    if (interval) clearInterval(interval);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 }; // Dirección inicial válida hacia la derecha
    score = 0;
    updateScore();
    currentLevel = 0;
    placeFood();
    interval = setInterval(moveSnake, levels[currentLevel]);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20 || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(interval);
        alert('Game Over');
        return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        updateScore();
        placeFood();
        if (score % 5 === 0 && currentLevel < levels.length - 1) {
            currentLevel++;
            clearInterval(interval);
            interval = setInterval(moveSnake, levels[currentLevel]);
        }
    } else {
        snake.pop();
    }
    drawBoard();
}

function updateScore() {
    scoreElement.textContent = score;
}

function placeFood() {
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    }
}

function drawBoard() {
    board.innerHTML = '';
    snake.forEach(segment => {
        const segmentElement = document.createElement('div');
        segmentElement.style.gridRowStart = segment.y + 1;
        segmentElement.style.gridColumnStart = segment.x + 1;
        segmentElement.classList.add('snake');
        board.appendChild(segmentElement);
    });
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function changeDirection(event) {
    const { key } = event;
    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);

// Controles para dispositivos móviles
upButton.addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});
downButton.addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});
leftButton.addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});
rightButton.addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});
