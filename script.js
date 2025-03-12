const platformSelection = document.getElementById("platform-selection");
const idInputContainer = document.getElementById("id-input");
const gameContainer = document.getElementById("game-container");
const playerIdInput = document.getElementById("player-id");
const startGameBtn = document.getElementById("start-game-btn");
const generateBtn = document.getElementById("generate-btn");
const gameBoard = document.getElementById("game-board");
const levelText = document.getElementById("level-text");
const message = document.getElementById("message");

const levels = [
    { level: 1, multiplier: 1.23 },
    { level: 2, multiplier: 1.54 },
    { level: 3, multiplier: 1.93 },
    { level: 4, multiplier: 2.41 },
    { level: 5, multiplier: 4.02 },
    { level: 6, multiplier: 6.71 },
    { level: 7, multiplier: 11.18 },
    { level: 8, multiplier: 27.97 },
    { level: 9, multiplier: 69.93 },
    { level: 10, multiplier: 349.68 }
];

let currentLevel = 0;
let gameOver = false;
let cooldownActive = false;

document.querySelectorAll(".platform-btn").forEach(button => {
    button.addEventListener("click", () => {
        platformSelection.classList.add("hidden");
        idInputContainer.classList.remove("hidden");
    });
});

startGameBtn.addEventListener("click", () => {
    if (playerIdInput.value.trim() === "") {
        alert("Please enter a valid Player ID.");
        return;
    }

    idInputContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    startGame();
});

function startGame() {
    if (cooldownActive) return;
    currentLevel = 0;
    gameOver = false;
    nextLevel();
}

function nextLevel() {
    if (currentLevel >= levels.length) {
        message.innerText = "You completed all levels! Please wait 10 minutes.";
        gameOver = true;
        cooldownActive = true;
        setTimeout(() => {
            cooldownActive = false;
            message.innerText = "";
            currentLevel = 0;
            gameContainer.classList.add("hidden");
            platformSelection.classList.remove("hidden");
        }, 10 * 60 * 1000);
        return;
    }

    gameBoard.innerHTML = "";
    levelText.innerText = `Level ${levels[currentLevel].level} (x${levels[currentLevel].multiplier})`;

    let winningIndex = Math.floor(Math.random() * 5);
    
    for (let i = 0; i < 5; i++) {
        const apple = document.createElement("div");
        apple.classList.add("apple");

        const img = document.createElement("img");

        // Check if it's the winning apple
        if (i === winningIndex) {
            apple.dataset.winning = "true";
            img.src = 'images/good-apple.png'; // Winning apple image
            img.alt = 'Good Apple';
            img.onerror = function() { this.src = 'images/fallback-good-apple.png'; }; // Fallback image
            apple.classList.add("good-apple");  // Optional: special class for good apple
        }
            img.src = 'images/bad-apple.png'; // Bad apple image
            img.alt = 'Bad Apple';
            img.onerror = function() { this.src = 'images/fallback-bad-apple.png'; }; // Fallback image
            apple.classList.add("bad-apple");  // Optional: special class for bad apples
        }

        apple.appendChild(img); // Add the image to the apple div
        gameBoard.appendChild(apple); // Add the apple div to the game board
    }
}

generateBtn.addEventListener("click", () => {
    if (gameOver) return;

    let apples = document.querySelectorAll(".apple");
    let revealed = false;

    apples.forEach(apple => {
        if (!revealed && apple.dataset.winning === "true") {
            apple.classList.add("revealed");
            const img = apple.querySelector("img");
            img.src = 'images/good-apple.png';  // Ensure the winning apple is shown
            img.alt = 'Winning Apple';
            img.onerror = function() { this.src = 'images/fallback-good-apple.png'; }; // Fallback image
            revealed = true;
        }
    });

    setTimeout(() => {
        currentLevel++;
        nextLevel();
    }, 1000);
});
