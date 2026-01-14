const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]          // diagonals
];

// Create board UI
function createBoard() {
  board.innerHTML = "";
  gameState.forEach((value, index) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerText = value;
    square.addEventListener("click", () => handleMove(index));
    board.appendChild(square);
  });
}

// Handle clicks
function handleMove(index) {
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  checkResult();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer}'s turn`;
  createBoard();
}

// Win / draw logic
function checkResult() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusText.innerText = `🎉 Player ${gameState[a]} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!gameState.includes("")) {
    statusText.innerText = "🤝 It's a draw!";
    gameActive = false;
  }
}

// Reset game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.innerText = "Player X's turn";
  createBoard();
}

createBoard();
