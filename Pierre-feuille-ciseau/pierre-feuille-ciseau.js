/*https://www.linkedin.com/in/estelle-alizier-5b1208298/*/
//JEU PIERRE FEUILLE CISEAUX
// Etape 1 : Fonction pour commencer le jeu
function playGame(userChoice) {
    // Définir les options disponibles pour moi et l'ordinateur
    const choices = ["pierre", "papier", "ciseaux"];
    
    // Choisir de manière aléatoire ce que l'ordinateur va jouer
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // Afficher mon choix et celui de l'ordinateur dans la console
    console.log("Je choisis :", userChoice);
    console.log("L'ordinateur choisit :", computerChoice);

    // Afficher le choix de l'ordinateur sur ma page HTML
    document.getElementById("computer-choice").innerText = "L'ordinateur choisit : " + computerChoice;

    // Déterminer le résultat du jeu en fonction de nos choix
    if (userChoice === computerChoice) {
        // En cas d'égalité
        displayResult("J'ai obtenu une égalité !");
    } else if (
        (userChoice === "pierre" && computerChoice === "ciseaux") ||
        (userChoice === "papier" && computerChoice === "pierre") ||
        (userChoice === "ciseaux" && computerChoice === "papier")
    ) {
        // Si je gagne
        displayResult("J'ai gagné !");
    } else {
        // Si l'ordinateur gagne
        displayResult("L'ordinateur a gagné contre moi !");
    }
}

// Etape 2 : Afficher le résultat du jeu
function displayResult(result) {
    document.getElementById("result").innerText = result;
}
 
 
