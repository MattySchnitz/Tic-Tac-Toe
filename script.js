document.addEventListener("DOMContentLoaded", () => {

  const board = document.getElementById("board");
  const statusText = document.getElementById("status");
  const squeak = document.getElementById("squeak");

  const scoreX = document.getElementById("scoreX");
  const scoreO = document.getElementById("scoreO");

  let scores = { "🐶": 0, "🐕": 0 };

  let currentPlayer = "🐶";
  let gameActive = true;
  let gameState = Array(9).fill("");

  const names = {
    "🐶": "Puppy",
    "🐕": "Doggo"
  };

  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function createBoard() {
    board.innerHTML = "";
    gameState.forEach((cell, index) => {
      const square = document.createElement("div");
      square.className = "square";
      square.textContent = cell;
      square.onclick = () => handleMove(index);
      board.appendChild(square);
    });
  }

  function handleMove(index) {
    if (!gameActive || gameState[index]) return;

    gameState[index] = currentPlayer;
    playSqueak();
    createBoard();

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "🐶" ? "🐕" : "🐶";
    statusText.textContent = `${names[currentPlayer]}'s turn! 💕`;
  }

  function playSqueak() {
    squeak.currentTime = 0;
    squeak.play();
  }

  function checkWinner() {
    for (const [a, b, c] of winningCombos) {
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        scores[gameState[a]]++;
        updateScores();
        statusText.textContent = `🎉 ${names[gameState[a]]} WINS!!! 🐾`;
        gameActive = false;
        showDog();
        return true;
      }
    }

    if (!gameState.includes("")) {
      statusText.textContent = "🤝 It's a tie! Everyone is a good dog!";
      gameActive = false;
      return true;
    }

    return false;
  }

  function updateScores() {
    scoreX.textContent = scores["🐶"];
    scoreO.textContent = scores["🐕"];
  }

  function showDog() {
    const dog = document.createElement("div");
    dog.id = "dog";
    dog.textContent = "🐶🎉🐕";
    document.body.appendChild(dog);
    setTimeout(() => dog.remove(), 2500);
  }

  window.resetGame = function () {
    gameState = Array(9).fill("");
    gameActive = true;
    currentPlayer = "🐶";
    statusText.textContent = "Puppy's turn! 💖";
    createBoard();
  };

  statusText.textContent = "Puppy's turn! 💖";
  createBoard();
});
