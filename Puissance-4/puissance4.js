/*https://www.linkedin.com/in/estelle-alizier-5b1208298/*/
//Puissance 4

// Etape 1 :  Travailler avec un tableau de cellules de jeu, initialise le joueur actuel à "red" 
//            et récupère une référence à l'élément qui affichera le résultat du jeu.
document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = [];
    let currentPlayer = "red";
    let gameResult = document.getElementById("game-result");

    // Etape 2 : Créer la grille de jeu
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);
            cells.push(cell);
        }
    }

    // Etape 3 : Ajouter un événement de clic à chaque cellule
    cells.forEach(cell => {
        cell.addEventListener("click", function() {
            dropToken(parseInt(this.dataset.col));
        });
    });

    // Function to drop a token in a column
    function dropToken(col) {
        const emptyCell = findEmptyCell(col);
        if (emptyCell !== null) {
            emptyCell.classList.add(currentPlayer);
            if (checkForWin(parseInt(emptyCell.dataset.row), col)) {
                displayResult(`Player ${currentPlayer.toUpperCase()} wins!`);
                disableBoard(); // Disable the board after a win
            } else {
                switchPlayer();
            }
        }
    }

    // Function to find the lowest empty cell in a column
    function findEmptyCell(col) {
        for (let row = 5; row >= 0; row--) {
            const cell = cells.find(c => c.dataset.row == row && c.dataset.col == col);
            if (!cell.classList.contains("red") && !cell.classList.contains("yellow")) {
                return cell;
            }
        }
        return null; // Column is full
    }

    // Function to switch players
    function switchPlayer() {
        currentPlayer = (currentPlayer === "red") ? "yellow" : "red";
    }

    // Function to check for a win
    function checkForWin(row, col) {
        return (
            checkDirection(row, col, 0, 1) ||  // Horizontal
            checkDirection(row, col, 1, 0) ||  // Vertical
            checkDirection(row, col, 1, 1) ||  // Diagonal /
            checkDirection(row, col, -1, 1)    // Diagonal \
        );
    }

    // Function to check for a win in a specific direction
    function checkDirection(row, col, rowDir, colDir) {
        const player = currentPlayer;
        let count = 1; // Count of consecutive tokens
        let r = row + rowDir;
        let c = col + colDir;

        while (r >= 0 && r < 6 && c >= 0 && c < 7 && cells.find(cell => cell.dataset.row == r && cell.dataset.col == c).classList.contains(player)) {
            count++;
            r += rowDir;
            c += colDir;
        }

        r = row - rowDir;
        c = col - colDir;

        while (r >= 0 && r < 6 && c >= 0 && c < 7 && cells.find(cell => cell.dataset.row == r && cell.dataset.col == c).classList.contains(player)) {
            count++;
            r -= rowDir;
            c -= colDir;
        }

        return count >= 4;
    }

    // Function to reset the game
    function resetGame() {
        cells.forEach(cell => cell.className = "cell");
        currentPlayer = "red";
        gameResult.innerText = ""; // Réinitialiser le résultat
    }

    // Function to display the result on the page
    function displayResult() {
        const winner = currentPlayer === "red" ? "rouges" : "jaunes";
        gameResult.innerText = `Bravo les ${winner} ont gagné !`;
    }

    // Function to disable the board after a win
    function disableBoard() {
        cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
    }

    // Add click event to the restart button
    document.getElementById("restart-button").addEventListener("click", resetGame);
});
