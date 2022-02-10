const elemList = [].slice.call(document.getElementsByClassName('slot'));

const createBoard = (col, row) => {
  let board = [];
  for (let i = 0; i < row; i++) {
    let tempArr = [];
    for (let i = 0; i < col; i++) {
      tempArr.push('x');
    }
    board.push(tempArr);
  }
  return board;
};

let gameBoard = createBoard(7, 7);
let turn = 0;
let nextColor = 'red';

const handleTurn = () => {
  turn++;
  nextColor = nextColor == 'red' ? 'blue' : 'red';
};

const findHorizontalWin = () => {
  let winner = 'x';
  for (row in gameBoard) {
    let combo = 0;
    let lastCol = '';
    for (col in gameBoard[row]) {
      if (lastCol == gameBoard[row][col] && gameBoard[row][col] !== 'x') {
        combo++;
      } else {
        combo = 1;
        lastCol = gameBoard[row][col];
      }
      if (combo == 4) {
        winner = gameBoard[row][col];
        break;
      }
    }
    if (winner != 'x') break;
  }

  if (winner == 'x') return 'none';
  return winner;
};
const findVerticalWin = () => {
  let winner = 'x';
  for (col in gameBoard[0]) {
    let combo = 0;
    let lastCol = '';
    for (row in gameBoard) {
      if (lastCol == gameBoard[row][col] && gameBoard[row][col] !== 'x') {
        combo++;
      } else {
        combo = 1;
        lastCol = gameBoard[row][col];
      }
      if (combo == 4) {
        winner = gameBoard[row][col];
        break;
      }
    }
    if (winner != 'x') break;
  }

  if (winner == 'x') return 'none';
  return winner;
};

const searchDiagnal = (row, col) => {
  let tr = row >= 3 && col <= 3;
  let tl = row >= 3 && col >= 3;
  let br = row <= 3 && col <= 3;
  let bl = row <= 3 && col >= 3;
  return [tr, tl, br, bl];
};

const findDiagnalWin = () => {
  for (row in gameBoard) {
    for (col in gameBoard[row]) {
      if (gameBoard[row][col] == 'x') continue;

      const color = gameBoard[row][col];
      const [tr, tl, br, bl] = searchDiagnal(row, col);
      let win = false;

      if (tr) {
        let solved = true;
        for (let i = 1; i < 4; i++) {
          if (gameBoard[Number(row) - i][Number(col) + i] !== color) solved = false;
          if (!solved) break;
        }
        if(solved) win = true;
      }
      if (br) {
        let solved = true;
        for (let i = 1; i < 4; i++) {
          if (gameBoard[Number(row) + i][Number(col) + i] !== color) solved = false;
          if (!solved) break;
        }
        if(solved) win = true;
      }
      if (bl) {
        let solved = true;
        for (let i = 1; i < 4; i++) {
          if (gameBoard[Number(row) + i][Number(col) - i] !== color) solved = false;
          if (!solved) break;
        }
        if(solved) win = true;
      }
      if (tl) {
        let solved = true;
        for (let i = 1; i < 4; i++) {
          if (gameBoard[Number(row) - i][Number(col) - i] !== color) solved = false;
          if (!solved) break;
        }
        if(solved) win = true;
      }

      if(win) return gameBoard[row][col]
    }
  }
  return 'none'
};

const findWin = () => {
  if (turn < 7) return;
  let hWin = findHorizontalWin();
  let vWin = findVerticalWin();
  let dWin = findDiagnalWin();

  console.log(`H: ${hWin}`);
  console.log(`V: ${vWin}`);
  console.log(`D: ${dWin}`);

  if(hWin !== 'none' || vWin !== 'none' || dWin !== 'none') {
    elemList.forEach((elem) => {
      elem.removeEventListener('mouseover', mouseOnHandler);
      elem.removeEventListener('click', clickHandler);
    });
    let winner = [hWin, vWin, dWin].filter( (item) => item != 'none')

    document.querySelector('body').style.background = (winner == 'r') ? 'red' : 'blue'
  }
};

const mouseOnHandler = (e) => {
  if (e.target.classList.contains('fixed')) return;
  e.target.style.background = nextColor;
};

const mouseOffHandler = (e) => {
  if (e.target.classList.contains('fixed')) return;
  e.target.style.background = 'black';
};

const clickHandler = (e) => {
  if (e.target.classList.contains('fixed')) return;
  let [y, x] = e.target.id.split('');
  let lowestCoord = 7;
  for (let i = 0; i <= 6; i++) {
    if (gameBoard[i][x] !== 'x') break;
    lowestCoord = i;
  }
  if (lowestCoord == 7) return;

  lowestElem = document.getElementById(`${lowestCoord}${x}`);

  lowestElem.style.background = nextColor;
  lowestElem.classList.add('fixed');
  gameBoard[lowestCoord][x] = nextColor[0];

  handleTurn();
  mouseOnHandler(e)
  findWin();
};


elemList.forEach((elem) => {
  elem.addEventListener('mouseover', mouseOnHandler);
  elem.addEventListener('mouseout', mouseOffHandler);
  elem.addEventListener('click', clickHandler);
});
