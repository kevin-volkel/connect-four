const createBoard = (col, row) => {
  let board = []
  for(let i = 0; i < row; i++) {
    let tempArr = [];
    for(let i = 0; i < col;i++) {
      tempArr.push('x')
    }
    board.push(tempArr)
  }
  return board
}

let gameBoard = createBoard(7, 7)
let turn = 0;
let nextColor = "red"

const handleTurn = () => {
  turn++;
  nextColor = (nextColor == 'red') ? 'blue' : 'red' 
}

const findHorizontal = () => {}
const findVertical = () => {}
const findDiagnal = () => {}

const findWin = () => {}

const mouseOnHandler = (e) => {
  if(e.target.classList.contains('fixed')) return;
  e.target.style.background = nextColor
}

const mouseOffHandler = (e) => {
  if(e.target.classList.contains('fixed')) return;
  e.target.style.background = 'black'
}

const clickHandler = (e) => {
  if(e.target.classList.contains('fixed')) return;
  let [y, x] = e.target.id.split('')
  let lowestCoord = 7;
  for(let i = 0; i <= 6; i++) {
    console.log(i);
    if(gameBoard[i][x] !== 'x') break;
    lowestCoord = i;
  }
  console.log(lowestCoord);
  if(lowestCoord == 7) return;
  
  lowestElem = document.getElementById(`${lowestCoord}${x}`)

  lowestElem.style.background = nextColor;
  lowestElem.classList.add("fixed")
  gameBoard[lowestCoord][x] = nextColor[0]
  console.log(gameBoard);

  handleTurn();
}

const elemList = [].slice.call(document.getElementsByClassName('slot'))

elemList.forEach((elem) => {
  elem.addEventListener('mouseover', mouseOnHandler)
  elem.addEventListener('mouseout', mouseOffHandler)
  elem.addEventListener('click', clickHandler)
})