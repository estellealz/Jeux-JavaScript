/*https://www.linkedin.com/in/estelle-alizier-5b1208298/*/const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const gameMessage = document.getElementById('game-message');
const bricks = document.querySelectorAll('.brick');

let ballX = 300;
let ballY = 100;
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddleX = 260;
let gameRunning = false;

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);

function startGame() {
  startButton.disabled = true;
  stopButton.disabled = false;
  gameRunning = true;
  gameMessage.innerText = "";
  updateGame();
}

function stopGame() {
  startButton.disabled = false;
  stopButton.disabled = true;
  gameRunning = false;
  resetGame();
}

function resetGame() {
    ballX = 300;
    ballY = 100;
    ballSpeedX = 5;
    ballSpeedY = 5;
    paddleX = 260;
  
    const rows = 3; // Nombre de lignes de briques
    const bricksPerRow = 5; // Nombre de briques par ligne
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < bricksPerRow; col++) {
        const brickIndex = row * bricksPerRow + col;
        const brick = bricks[brickIndex];
  
        if (brick) {
          brick.style.display = 'block';
          const containerRect = document.getElementById('game-container').getBoundingClientRect();
          const brickWidth = (containerRect.width - (bricksPerRow - 1) * 5) / bricksPerRow; // Ajustez la marge (5px) selon vos besoins
          brick.style.width = brickWidth + 'px';
          brick.style.left = col * (brickWidth + 5) + 'px'; // Ajustez la marge (5px) selon vos besoins
          brick.style.top = row * 25 + 'px'; // Ajustez la marge (25px) selon vos besoins
        }
      }
    }
  }
  
  

function updateGame() {
    if (gameRunning) {
      ballX += ballSpeedX;
      ballY += ballSpeedY;
  
      // Gestion des collisions avec le paddle
      if (
        ballY + 20 >= paddle.offsetTop &&
        ballY <= paddle.offsetTop + paddle.clientHeight &&
        ballX + 20 >= paddle.offsetLeft &&
        ballX <= paddle.offsetLeft + paddle.clientWidth
      ) {
        ballSpeedY *= -1;
      }
  
      // Gestion des collisions avec les briques
      bricks.forEach((brick, index) => {
        if (
          ballY + 20 >= brick.offsetTop &&
          ballY <= brick.offsetTop + brick.clientHeight &&
          ballX + 20 >= brick.offsetLeft &&
          ballX <= brick.offsetLeft + brick.clientWidth
        ) {
          brick.style.display = 'none';
          ballSpeedY *= -1;
        }
      });
  
      // Gestion des collisions avec les bords du jeu
      if (ballX < 0 || ballX > (600 - 20)) {
        ballSpeedX *= -1;
      }
  
      if (ballY < 0) {
        ballSpeedY *= -1;
      }
  
      // Gestion de la perte de la partie
      if (ballY > (400 - 20)) {
        gameMessage.innerText = "Perdu!";
        stopGame();
      }
  
 
