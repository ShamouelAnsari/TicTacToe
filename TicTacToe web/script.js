const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector("#reset-btn");
const gameStatus = document.querySelector(".game-status");
const popup = document.querySelector("#popup");
const popupContent = document.querySelector("#popup-content");
const popupMessage = document.querySelector("#popup-message");
const popupBtn = document.querySelector("#popup-btn");

let currentPlayer = "X";
let isGameEnded = false;

/**
 * Add an event listener for each cell to handle the player's move
 */
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // If the cell is already clicked or the game has ended, ignore the click
    if (cell.textContent || isGameEnded) return;

    // Update the cell's text content and the current player
    cell.textContent = currentPlayer;
    cell.classList.add("active");
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Check if the game has ended (win or tie)
    const winner = checkWinner();
    if (winner) {
      announceWinner(winner);
      isGameEnded = true;
    } else if (isTie()) {
      announceTie();
      isGameEnded = true;
    }
  });
});

/**
 * Reset the game board
 */
resetBtn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("active");
  });
  currentPlayer = "X";
  isGameEnded = false;
  gameStatus.textContent = "";
});

/**
 * Check if any player has won the game
 */
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      return cells[a].textContent;
    }
  }

  return null;
}

/**
 * Announce the winner of the game
 * @param {*} winner
 */
function announceWinner(winner) {
  gameStatus.textContent = `Player ${winner} has won the game!`;
  gameStatus.style.color = "#1abc9c";
  popupMessage.textContent = `Player ${winner} has won the game!`;
  popupMessage.style.color = "#000";
  popup.style.display = "block";
}

/**
 * Check if the game is a tie
 */
function isTie() {
  return [...cells].every((cell) => cell.textContent);
}

/**
 * Announce the game is a tie
 */
function announceTie() {
  gameStatus.textContent = "The game is a tie!";
  gameStatus.style.color = "#f39c12";
  popupMessage.textContent = "The game is a tie!";
  popupMessage.style.color = "#000";
  popup.style.display = "block";
}

/**
 * Add an event listener to the pop-up button to reset the game
 */
popupBtn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("active");
  });
  currentPlayer = "X";
  isGameEnded = false;
  gameStatus.textContent = "";
  popup.style.display = "none";
});