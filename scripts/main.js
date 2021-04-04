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

const createPlayers = (playerName) => {
  function newPlayer(name, token) {
    this.name = name;
    this.token = token;
  }
  let player = new newPlayer(playerName, "X");
  let computer = new newPlayer("Computer", "O");
  return { player: player, computer: computer };
};

const playGame = (() => {
  const players = createPlayers("Linus");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      eval(`box${i}${j}.addEventListener("click", () => {
								if (currentBoard[i][j] !== 'O' &&
										currentBoard[i][j] !== 'X') {
												currentBoard[i][j] = 'X';
												box${i}${j}.appendChild(playX());
								}
						})`);
    }
  }
  //test
  currentBoard[1][0] = players.player.token;
  box10.appendChild(playX());
  currentBoard[1][1] = players.computer.token;
  box11.appendChild(playO());
  console.log(players.player.name, players.player.token);
  console.log(players.computer.name, players.computer.token);
  console.log(currentBoard);
  console.log(typeof currentBoard);
  // test end
})();
