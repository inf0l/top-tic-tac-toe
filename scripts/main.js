// HTML
const html = document.querySelector("html");
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "./css/style.css";
html.appendChild(style);
const container = document.querySelector("#container");
const fullBoard = document.createElement("div");
fullBoard.className = "board";
container.appendChild(fullBoard);

function playO() {
  const O = document.createElement("div");
  O.className = "oMove";
  return O;
}

function playX() {
  const X = document.createElement("div");
  X.className = "xMove";
  return X;
}

// Game logic

// Create the game board
const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      let cell = [];
      row.push(cell);
      const boardCell = document.createElement("div");
      boardCell.id = `box${i}${j}`;
      boardCell.className = "cell";
      const prefix = "box";
      eval(
        "const " + prefix + i + j + `= document.querySelector('#box${i}${j}')`
      );
      fullBoard.appendChild(boardCell);
    }
    board.push(row);
  }
  return board;
};

const currentBoard = Gameboard();

// Function to create player and computer opponent
const createPlayers = (playerName) => {
  function newPlayer(name, token) {
    this.name = name;
    this.token = token;
  }
  let player = new newPlayer(playerName, "X");
  let computer = new newPlayer("Computer", "O");
  return { player: player, computer: computer };
};

// Determine if there are empty cells to play
const availableMove = () => {
  function containsOnly(array1, array2) {
    return array2.every((elem) => array1.includes(elem));
  }
  return (
    containsOnly(["X", "O"], currentBoard[0]) &&
    containsOnly(["X", "O"], currentBoard[1]) &&
    containsOnly(["X", "O"], currentBoard[2])
  );
};

// Main game function.
const playGame = (() => {
  let whoseTurn = "P";
  const players = createPlayers("Linus");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      eval(`box${i}${j}.addEventListener("click", () => {
								if (currentBoard[i][j] !== 'O' &&
										currentBoard[i][j] !== 'X') {
												currentBoard[i][j] = 'X';
												box${i}${j}.appendChild(playX());
												winCondition();
												if (!availableMove()) {
												whoseTurn = 'C';
												computerMove();
												}
								}
						})`);
    }
  }

  const computerMove = () => {
    while (whoseTurn === "C") {
      const xCoord = Math.floor(Math.random() * 3);
      const yCoord = Math.floor(Math.random() * 3);
      if (
        currentBoard[xCoord][yCoord] !== "O" &&
        currentBoard[xCoord][yCoord] !== "X"
      ) {
        currentBoard[xCoord][yCoord] = "O";
        eval(`box${xCoord}${yCoord}.appendChild(playO());`);
        whoseTurn = "P";
      }
    }
    winCondition();
  };
})();

function winCondition() {
  const transpose = (board) => {
    return board[0].map((_, c) => board.map((r) => r[c]));
  };

  const transposedBoard = transpose(currentBoard);
  const diagonalOne = [
    currentBoard[0][0],
    currentBoard[1][1],
    currentBoard[2][2],
  ];
  const diagonalTwo = [
    currentBoard[2][0],
    currentBoard[1][1],
    currentBoard[0][2],
  ];

  if (
    currentBoard[0].every((x) => x == "X") ||
    currentBoard[0].every((x) => x == "O") ||
    currentBoard[1].every((x) => x == "X") ||
    currentBoard[1].every((x) => x == "O") ||
    currentBoard[2].every((x) => x == "X") ||
    currentBoard[2].every((x) => x == "O") ||
    transposedBoard[0].every((x) => x == "X") ||
    transposedBoard[0].every((x) => x == "O") ||
    transposedBoard[1].every((x) => x == "X") ||
    transposedBoard[1].every((x) => x == "O") ||
    transposedBoard[2].every((x) => x == "X") ||
    transposedBoard[2].every((x) => x == "O") ||
    diagonalOne.every((x) => x == "X") ||
    diagonalOne.every((x) => x == "O") ||
    diagonalTwo.every((x) => x == "X") ||
    diagonalTwo.every((x) => x == "O")
  ) {
    console.log("Win");
  }
}
