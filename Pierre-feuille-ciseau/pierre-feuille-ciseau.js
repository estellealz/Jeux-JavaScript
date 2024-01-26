/*https://www.linkedin.com/in/estelle-alizier-5b1208298/*/
//JEU PIERRE FEUILLE CISEAUX

// Etape 1 : Fonction pour commencer le jeu
function playGame(userChoice) {
    const choices = ["pierre", "papier", "ciseaux"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // Affiche le choix de l'utilisateur et de l'ordinateur
    console.log("Utilisateur :", userChoice);
    console.log("Ordinateur :", computerChoice);

    // Affiche le choix de l'ordinateur sur la page
    document.getElementById("computer-choice").innerText = "Ordinateur : " + computerChoice;

    // Détermine le résultat du jeu
    if (userChoice === computerChoice) {
        displayResult("Égalité !");
    } else if (
        (userChoice === "pierre" && computerChoice === "ciseaux") ||
        (userChoice === "papier" && computerChoice === "pierre") ||
        (userChoice === "ciseaux" && computerChoice === "papier")
    ) {
        displayResult("Vous avez gagné !");
    } else {
        displayResult("L'ordinateur a gagné !");
    }
}

// Etape 2 : Afficher le resultat de la partie
function displayResult(result) {
    document.getElementById("result").innerText = result;
}
