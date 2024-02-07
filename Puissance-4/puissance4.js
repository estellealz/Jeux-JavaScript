/*https://www.linkedin.com/in/estelle-alizier-5b1208298/*/
// Puissance 4

// J'ai ajouté un écouteur d'événements pour attendre que le contenu de la page soit chargé
document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");  // J'ai récupéré une référence à l'élément du tableau de jeu
    const cells = [];  // J'ai initialisé un tableau pour stocker les cellules du jeu
    let currentPlayer = "red";  // J'ai initialisé le joueur actuel à "red"
    let gameResult = document.getElementById("game-result");  // J'ai récupéré une référence à l'élément qui affichera le résultat du jeu

    // J'ai créé la grille de jeu avec une boucle imbriquée pour les lignes et les colonnes
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement("div");  // J'ai créé une nouvelle cellule
            cell.className = "cell";  // J'ai attribué une classe à la cellule
            cell.dataset.row = row;  // J'ai attribué des attributs de données pour stocker la position de la cellule
            cell.dataset.col = col;
            board.appendChild(cell);  // J'ai ajouté la cellule au tableau de jeu
            cells.push(cell);  // J'ai ajouté la cellule au tableau de cellules
        }
    }

    // J'ai ajouté un événement de clic à chaque cellule pour la fonction dropToken
    cells.forEach(cell => {
        cell.addEventListener("click", function () {
            dropToken(parseInt(this.dataset.col));
        });
    });

    // J'ai écrit une fonction pour déposer un jeton dans une colonne
    function dropToken(col) {
        const emptyCell = findEmptyCell(col);  // J'ai trouvé la cellule vide la plus basse dans la colonne
        if (emptyCell !== null) {
            emptyCell.classList.add(currentPlayer);  // J'ai ajouté la classe du joueur actuel à la cellule vide
            if (checkForWin(parseInt(emptyCell.dataset.row), col)) {
                displayResult();  // J'ai affiché le résultat du jeu
                disableBoard();  // J'ai désactivé le tableau après une victoire
            } else {
                switchPlayer();  // J'ai changé de joueur
            }
        }
    }

    // J'ai écrit une fonction pour trouver la cellule vide la plus basse dans une colonne
    function findEmptyCell(col) {
        for (let row = 5; row >= 0; row--) {
            const cell = cells.find(c => c.dataset.row == row && c.dataset.col == col);
            if (!cell.classList.contains("red") && !cell.classList.contains("yellow")) {
                return cell;
            }
        }
        return null; // La colonne est pleine
    }

    // J'ai écrit une fonction pour changer de joueur
    function switchPlayer() {
        currentPlayer = (currentPlayer === "red") ? "yellow" : "red";
    }

    // J'ai écrit une fonction pour vérifier s'il y a un gagnant en vérifiant différentes directions
    function checkForWin(row, col) {
        return (
            checkDirection(row, col, 0, 1) ||  // Horizontal
            checkDirection(row, col, 1, 0) ||  // Vertical
            checkDirection(row, col, 1, 1) ||  // Diagonale /
            checkDirection(row, col, -1, 1)    // Diagonale \
        );
    }

    // J'ai écrit une fonction pour vérifier un gain dans une direction spécifique / \ | _
    function checkDirection(row, col, rowDir, colDir) {
        const player = currentPlayer;
        let count = 1;  // Compteur de jetons consécutifs
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

    // J'ai écrit une fonction pour recommencer le jeu
    function resetGame() {
        cells.forEach(cell => cell.className = "cell");
        currentPlayer = "red";
        gameResult.innerText = "";  // J'ai réinitialisé le résultat
    }

    // J'ai écrit une fonction pour afficher le résultat sur la page
    function displayResult() {
        const winner = currentPlayer === "red" ? "rouges" : "jaunes";
        gameResult.innerText = `Bravo les ${winner} ont gagné !`;
    }

    // J'ai écrit une fonction pour désactiver le tableau après une victoire
    function disableBoard() {
        cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
    }

    // J'ai ajouté un événement de clic au bouton de redémarrage
    document.getElementById("restart-button").addEventListener("click", resetGame);
});
