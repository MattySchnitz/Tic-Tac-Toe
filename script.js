const board = document.getElementById('board');
let currentPlayer = 'X';
let state = Array(9).fill('');

function createBoard() {
  board.innerHTML = '';
  state.forEach((_, i) => {
    const sq = document.createElement('div');
    sq.classList.add('square');
    sq.addEventListener('click', () => makeMove(i));
    sq.innerText = state[i];
    board.appendChild(sq);
  });
}

function makeMove(i) {
  if (!state[i]) {
    state[i] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    createBoard();
  }
}

function resetGame() {
  state = Array(9).fill('');
  currentPlayer = 'X';
  createBoard();
}

createBoard();
