document.addEventListener("DOMContentLoaded", () => {

  const board = document.getElementById("board");
  const statusText = document.getElementById("status");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

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

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn 💕`;
  }

  function checkWinner() {
    for (const [a, b, c] of winningCombos) {
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        statusText.textContent = `🎉 Player ${gameState[a]} wins!`;
        gameActive = false;
        showCat();
        return true;
      }
    }

    if (!gameState.includes("")) {
      statusText.textContent = "🤝 It's a draw!";
      gameActive = false;
      return true;
    }

    return false;
  }

  function showCat() {
    const cat = document.createElement("div");
    cat.id = "cat";
    cat.textContent = "🐱🎉";
    document.body.appendChild(cat);

    setTimeout(() => {
      cat.remove();
    }, 2000);
  }

  window.resetGame = function () {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "Player X's turn";
    createBoard();
  };

  createBoard();
});
