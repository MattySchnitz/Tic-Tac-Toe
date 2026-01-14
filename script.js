document.addEventListener("DOMContentLoaded", () => {

  const board = document.getElementById("board");
  const statusText = document.getElementById("status");
  const squeak = document.getElementById("squeak");

  const scoreX = document.getElementById("scoreX");
  const scoreO = document.getElementById("scoreO");

  let scores = { "🐶": 0, "🐕": 0 };

  // Load scores from localStorage
  const savedScores = JSON.parse(localStorage.getItem("dogScores"));
  if (savedScores) {
    scores = savedScores;
  }

  let currentPlayer = "🐶";
  let gameActive = true;
  let gameOver = false;
  let gameState = Array(9).fill("");
  let lastWinner = null; // Track previous winner

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
      square.onclick = () => handleSquareClick(index);
      board.appendChild(square);
    });
  }

  function handleSquareClick(index) {
    // If game over
    if (gameOver) {
      startNewRound(index); // Pass index for immediate move if tapped
      return;
    }

    if (!gameActive || gameState[index]) return;

    makeMove(index);
  }

  function makeMove(index) {
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
        const winner = gameState[a];
        lastWinner = winner;
        scores[winner]++;
        saveScores();
        updateScores();

        statusText.textContent = `🎉 ${names[winner]} WINS!!! Tap anywhere to play again! 🐾`;
        gameActive = false;
        gameOver = true;
        showWinner(winner);
        return true;
      }
    }

    if (!gameState.includes("")) {
      lastWinner = null; // tie
      statusText.textContent = "🤝 It's a tie! Tap anywhere to play again!";
      gameActive = false;
      gameOver = true;
      return true;
    }

    return false;
  }

  function saveScores() {
    localStorage.setItem("dogScores", JSON.stringify(scores));
  }

  function updateScores() {
    scoreX.textContent = scores["🐶"];
    scoreO.textContent = scores["🐕"];
  }

  function showWinner(winner) {
    const popup = document.createElement("div");
    popup.id = "dog";
    popup.textContent = `${winner} 🎉 ${winner}`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2500);
  }

  function startNewRound(firstMoveIndex = null) {
    gameState = Array(9).fill("");
    gameActive = true;
    gameOver = false;

    // Determine who starts: loser of last game starts
    if (lastWinner === "🐶") currentPlayer = "🐕";
    else if (lastWinner === "🐕") currentPlayer = "🐶";
    else currentPlayer = "🐶"; // tie defaults to Puppy

    statusText.textContent = `${names[currentPlayer]}'s turn! 💖`;

    createBoard();

    // If user tapped a square on new round, make that move immediately
    if (firstMoveIndex !== null && !gameState[firstMoveIndex]) {
      makeMove(firstMoveIndex);
    }
  }

  // Initial load
  updateScores();
  statusText.textContent = `${names[currentPlayer]}'s turn! 💖`;
  createBoard();
});
