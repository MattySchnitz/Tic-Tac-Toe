document.addEventListener("DOMContentLoaded", () => {

  const board = document.getElementById("board");
  const statusText = document.getElementById("status");

  let currentPlayer = "🐶";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const players = {
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
      square.classList.add("square");
      square.textContent = cell;
      square.addEventListener("click", () => handleMove(index));
      board.appendChild(square);
    });
  }

  function handleMove(index) {
    if (!gameActive || gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    createBoard();

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "🐶" ? "🐕" : "🐶";
    statusText.textContent = `${players[currentPlayer]}'s turn! 💕`;
  }

  function checkWinner() {
    for (const [a, b, c] of winningCombos) {
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        statusText.textContent = `🎉 ${players[gameState[a]]} WINS!!! 🐾`;
        gameActive = false;
        showDog();
        return true;
      }
    }

    if (!gameState.includes("")) {
      statusText.textContent = "🤝 It's a tie! Good puppies!";
      gameActive = false;
      return true;
    }

    return false;
  }

  function showDog() {
    const dog = document.createElement("div");
    dog.id = "dog";
    dog.textContent = "🐶🎉🐕";
    document.body.appendChild(dog);

    setTimeout(() => dog.remove(), 2200);
  }

  window.resetGame = function () {
    currentPlayer = "🐶";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "Puppy's turn! 💖";
    createBoard();
  };

  statusText.textContent = "Puppy's turn! 💖";
  createBoard();
});
