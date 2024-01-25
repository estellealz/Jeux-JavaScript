/*https://www.linkedin.com/in/estelle-alizier-5b1208298/*/
// JEU NOMBRE 

// 1 Générer un nombre aléatoire
let randomNumber;

// 2 Sélectionner les éléments HTML pour manipulation ultérieure
let guessField = document.getElementById('guessField');
let guessSubmit = document.getElementById('guessSubmit');
let reset = document.getElementById('reset');
let guesses = document.getElementById('guesses');
let lastResult = document.getElementById('lastResult');
let lowOrHigh = document.getElementById('lowOrHigh');

let guessCount = 0; // Ajout du compteur d'essais

function generateRandomNumber() {
    return Math.floor(Math.random() * 100);
}

function startGame() {
    randomNumber = generateRandomNumber();
    console.log(randomNumber) //voir le bon nombre
    guessCount = 0;
    guesses.textContent = guessCount;
    lastResult.textContent = '';
    lowOrHigh.textContent = '';
    guessField.disabled = false;
    guessSubmit.disabled = false;
}

startGame();

guessSubmit.addEventListener("click", function () {
    let guess = parseInt(guessField.value);
    console.log("Tentative : " + guess); //afficher sur la console les anciens numéros

    if (guessCount < 10) {
        guessCount++;

        if (guess === randomNumber) {
            lastResult.textContent = 'Bravo le nombre était : ' + randomNumber;
            lastResult.style.backgroundColor = 'green';
            lowOrHigh.textContent = '';
            guessField.disabled = true; // Désactiver le champ d'entrée après avoir deviné correctement
            guessSubmit.disabled = true; // Désactiver le bouton de soumission après avoir deviné correctement
        } else {
            guesses.textContent = guessCount;
            lastResult.textContent = guess > randomNumber ? 'Le nombre est trop haut.' : 'Le nombre est trop bas.';
            lastResult.style.backgroundColor = guess > randomNumber ? 'red' : 'yellow';
        }
    } else {
        // Limite d'essais atteinte
        lastResult.textContent = 'Dommage! Trop de tentatives. Le nombre était : ' + randomNumber;
        lastResult.style.backgroundColor = 'orange';
        guessField.disabled = true; // Désactiver le champ d'entrée après 10 essais
        guessSubmit.disabled = true; // Désactiver le bouton de soumission après 10 essais
    }
});

function resetGame() {
    startGame();
}

reset.addEventListener("click", resetGame);

guessField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { // Vérifie si la touche pressée est la touche "Enter"
        event.preventDefault(); // Empêche la soumission du formulaire par défaut
        validateGuess();
    }
});

function validateGuess() {
    let guess = parseInt(guessField.value); //Récupére la valeur du champ saisie et converti en nombre entier

    if (!isNaN(guess) && guess >= 1 && guess <= 100) {// Valider que l'entrée est un nombre entre 1 et 100
        guessSubmit.click(); // Simuler un clic sur le bouton de soumission
    } else {
        alert("Veuillez entrer un nombre valide entre 1 et 100.");
        guessField.value = ""; // Effacer le champ
    }
}
