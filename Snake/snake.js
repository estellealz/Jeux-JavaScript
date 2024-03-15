const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restart-button');
const scoreElement = document.getElementById('score'); // Ajout de cet élément pour afficher le score
restartButton.addEventListener('click', resetGame);

document.getElementById('arrow-top').addEventListener('click', () => changeDirection('up'));
document.getElementById('arrow-bottom').addEventListener('click', () => changeDirection('down'));
document.getElementById('arrow-left').addEventListener('click', () => changeDirection('left'));
document.getElementById('arrow-right').addEventListener('click', () => changeDirection('right'));

// Taille d'une cellule
const cellSize = 20;

// Taille du canvas
const canvasSize = 400;

// Initial snake position
let snake = [{ x: 10, y: 10 }];
let direction = 'right';

// Initial food position
let food = { x: 15, y: 15 };

let gameRunning = true;
let score = 0; // Ajout de la variable score

function drawSnake() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = '#00f'; // Couleur du serpent

    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * cellSize, snake[i].y * cellSize, cellSize, cellSize);
    }
}

function drawFood() {
    ctx.fillStyle = '#f00'; // Couleur de la nourriture
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }

    snake.unshift(head);

    // Vérifie la collision avec la nourriture
    if (head.x === food.x && head.y === food.y) {
        // Génère une nouvelle nourriture
        food = {
            x: Math.floor(Math.random() * canvasSize / cellSize),
            y: Math.floor(Math.random() * canvasSize / cellSize)
        };
        
        // Augmente le score
        score++;
        updateScore(); // Mise à jour de l'affichage du score
    } else {
        snake.pop();
    }
}

function updateScore() {
    scoreElement.innerText = 'Score: ' + score;
}

function checkCollision() {
    const head = snake[0];

    // Vérifie la collision avec les murs
    if (head.x < 0 || head.x >= canvasSize / cellSize || head.y < 0 || head.y >= canvasSize / cellSize) {
        return true;
    }

    // Vérifie la collision avec lui-même
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    if (!gameRunning) {
        document.getElementById('game-message').innerText = 'Fin de partie. Votre score est ' + score;
        return;
    }

    moveSnake();
    if (checkCollision()) {
        gameRunning = false;
        document.getElementById('game-message').innerText = 'Game Over! Votre score est ' + score;
        return;
    }

    drawSnake();
    drawFood();

    if (gameRunning) {
        setTimeout(() => {
            requestAnimationFrame(gameLoop);
        }, 100); // Ajustez la vitesse (millisecondes par image)
    }
}

function resetGame() {
    // Actualise la page
    window.location.reload();
}


// Gère les pressions de touches de flèches
document.addEventListener('keydown', (e) => {
    // Annule le comportement par défaut de la touche si c'est une touche de direction
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }

    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});
function changeDirection(newDirection) {
    switch (newDirection) {
        case 'up':
            if (direction !== 'down') direction = 'up';
            break;
        case 'down':
            if (direction !== 'up') direction = 'down';
            break;
        case 'left':
            if (direction !== 'right') direction = 'left';
            break;
        case 'right':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

// Commence la boucle de jeu
gameLoop();
