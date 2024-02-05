/*https://www.linkedin.com/in/estelle-alizier-5b1208298/*/
// JEU NOMBRE 

// Étape 1: Générer un nombre aléatoire
let randomNumber;

// Étape 2 : Sélectionner les éléments HTML pour manipulation ultérieure
let guessField = document.getElementById('guessField'); // J'ai sélectionné le champ de saisie
let guessSubmit = document.getElementById('guessSubmit'); // J'ai sélectionné le bouton de soumission
let reset = document.getElementById('reset'); // J'ai sélectionné le bouton de réinitialisation
let guesses = document.getElementById('guesses'); // J'ai sélectionné l'affichage du nombre d'essais
let lastResult = document.getElementById('lastResult'); // J'ai sélectionné l'affichage du résultat précédent
let lowOrHigh = document.getElementById('lowOrHigh'); // J'ai sélectionné l'affichage si la conjecture est trop haute ou trop basse

// Étape 3 : Initialisation du compteur
let guessCount = 0; // J'ai ajouté le compteur d'essais

// Étape 4 : Générer un nombre aléatoire de 0 à 100
function generateRandomNumber() {
    return Math.floor(Math.random() * 100);
}

// Étape 5 : Fonction pour commencer le jeu
function startGame() {
    randomNumber = generateRandomNumber(); // J'ai généré un nouveau nombre aléatoire
    console.log(randomNumber) // J'ai affiché le bon nombre sur la console (à des fins de débogage)
    guessCount = 0; // J'ai initialisé à 0 le nombre de tentatives
    guesses.textContent = guessCount;
    lastResult.textContent = '';
    lowOrHigh.textContent = '';
    guessField.disabled = false; // J'ai activé le champ de saisie
    guessSubmit.disabled = false; // J'ai activé le bouton de soumission
}

// Étape 6 : Lancer le jeu
startGame(); // J'ai appelé la fonction pour initialiser le jeu au chargement de la page

guessSubmit.addEventListener("click", function () {
    let guess = parseInt(guessField.value); // J'ai converti la conjecture en nombre entier
    console.log("Tentative : " + guess); // J'ai affiché sur la console les anciens numéros

    // Condition moins de 10 tentatives
    if (guessCount < 10) {
        guessCount++; // J'ai incrémenté le compteur d'essais

        // Vérification
        if (guess === randomNumber) {
            lastResult.textContent = 'Bravo le nombre était : ' + randomNumber; // J'ai affiché un message de réussite
            lastResult.style.backgroundColor = 'green'; // J'ai mis le fond en vert
            lowOrHigh.textContent = '';
            guessField.disabled = true; // J'ai désactivé le champ d'entrée après avoir deviné correctement
            guessSubmit.disabled = true; // J'ai désactivé le bouton de soumission après avoir deviné correctement
        } else {
            guesses.textContent = guessCount; // J'ai mis à jour le nombre d'essais affiché
            lastResult.textContent = guess > randomNumber ? 'Le nombre est trop haut.' : 'Le nombre est trop bas.'; // J'ai affiché si la conjecture est trop haute ou trop basse
            lastResult.style.backgroundColor = guess > randomNumber ? 'red' : 'yellow'; // J'ai mis le fond en rouge
        }
    } else {
        // Limite d'essais atteinte --> PERDU
        lastResult.textContent = 'Dommage! Trop de tentatives. Le nombre était : ' + randomNumber; // J'ai affiché un message de défaite
        lastResult.style.backgroundColor = 'orange'; // J'ai mis le fond en orange
        guessField.disabled = true; // J'ai désactivé le champ d'entrée après 10 essais
        guessSubmit.disabled = true; // J'ai désactivé le bouton de soumission après 10 essais
    }
});

// Étape 7 : Recommencer le jeu
function resetGame() {
    startGame(); // J'ai relancé le jeu
}

reset.addEventListener("click", resetGame);

guessField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { // J'ai vérifié si la touche pressée est la touche "Enter"
        event.preventDefault(); // J'ai empêché la soumission du formulaire par défaut
        validateGuess();
    }
});

function validateGuess() {
    let guess = parseInt(guessField.value); // J'ai récupéré la valeur du champ saisie et converti en nombre entier

    if (!isNaN(guess) && guess >= 1 && guess <= 100) {// J'ai validé que l'entrée est un nombre entre 1 et 100
        guessSubmit.click(); // J'ai simulé un clic sur le bouton de soumission
    } else {
        alert("Veuillez entrer un nombre valide entre 1 et 100.");
        guessField.value = ""; // J'ai effacé le champ
    }
}
