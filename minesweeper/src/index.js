import {createHeader} from "./js/header";
import {createGame} from "./js/game";
import {createTable} from "./js/table";


let column = 10;
let row = 10;
let bomb = 10;
let cells = column * row;
let step = 0;
let bombsIndex;
let closeCell = column * row;
let level = 'Легкий';
let theme = 'Темная тема';
let countFlag = 0;
let countBomb = 0;

let sec = 0;
let min = 0;
let hrs = 0;
let t;
let timeInner;
let game = 'end';
let arrayClasses = [];
let arrayInnerHTML = [];
let style = [];
let status;
let gameStyle;
let gameFieldStyle;
let gameClass;


function setLocalStorage() {

  if (game === 'go') {
    let time = document.querySelector('.time');
    const game = document.querySelector('.game');
    const gameField = document.querySelector('.game__field');
    localStorage.setItem('gameClass', game.className);
    localStorage.setItem('gameStyle', game.style.maxWidth);
    localStorage.setItem('gameFieldStyle', gameField.style.maxWidth);
    localStorage.setItem('timeInner', time.textContent);
    localStorage.setItem('bomb', bomb);
    localStorage.setItem('column', column);
    localStorage.setItem('row', row);
    localStorage.setItem('cells', cells);
    localStorage.setItem('step', step);
    if (bombsIndex) {
      localStorage.setItem('bombsIndex', JSON.stringify(bombsIndex));
    }
    localStorage.setItem('closeCell', closeCell);
    localStorage.setItem('status', gameStatus.innerHTML);
    localStorage.setItem('level', level);
    localStorage.setItem('theme', theme);
    localStorage.setItem('sec', sec);
    localStorage.setItem('min', min);
    localStorage.setItem('hrs', hrs);
    localStorage.setItem('countFlag', infoFlag.innerHTML);
    localStorage.setItem('countBomb', infoBombNumber.innerHTML);
    const cell = document.querySelectorAll('.cell');
    arrayClasses = [];
    arrayInnerHTML = [];
    style = [];
    for (let i = 0; i < cell.length; i++) {
      arrayClasses.push(cell[i].className);
      arrayInnerHTML.push(cell[i].innerHTML);
      style.push(cell[i].style.color);
    }
    localStorage.setItem('arrayClasses', JSON.stringify(arrayClasses));
    localStorage.setItem('arrayInnerHTML', JSON.stringify(arrayInnerHTML));
    localStorage.setItem('style', JSON.stringify(style));
  } else {
    localStorage.clear();
    localStorage.setItem('arrayResultWin', JSON.stringify(arrayResultWin));
  }

}
window.addEventListener('beforeunload', setLocalStorage);



function getLocalStorage() {
  if (localStorage.getItem('arrayResultWin')) {
    let str = localStorage.getItem('arrayResultWin');
    arrayResultWin = JSON.parse(str);
  }
  if (localStorage.getItem('game')) {
    game = localStorage.getItem('game');
  }
  if (game === 'go') {
    if (localStorage.getItem('gameClass')) {
      gameClass = localStorage.getItem('gameClass');
    }
    if (localStorage.getItem('gameStyle')) {
      gameStyle = localStorage.getItem('gameStyle');
    }
    if (localStorage.getItem('gameFieldStyle')) {
      gameFieldStyle = localStorage.getItem('gameFieldStyle');
    }
    if (localStorage.getItem('timeInner')) {
      timeInner = localStorage.getItem('timeInner');
    }
    if (localStorage.getItem('gameClass')) {
      gameClass = localStorage.getItem('gameClass');
    }
    if (localStorage.getItem('bomb')) {
      bomb = localStorage.getItem('bomb');
    }
    if (localStorage.getItem('column')) {
      column = localStorage.getItem('column');
    }
    if (localStorage.getItem('row')) {
      row = localStorage.getItem('row');
    }
    if (localStorage.getItem('cells')) {
      cells = localStorage.getItem('cells');
    }
    if (localStorage.getItem('step')) {
      step = localStorage.getItem('step');
    }
    if (localStorage.getItem('bombsIndex')) {
      let str = localStorage.getItem('bombsIndex');
      bombsIndex = JSON.parse(str);
    }
    if (localStorage.getItem('arrayClasses')) {
      let str = localStorage.getItem('arrayClasses');
      arrayClasses = JSON.parse(str);
    }
    if (localStorage.getItem('arrayInnerHTML')) {
      let str = localStorage.getItem('arrayInnerHTML');
      arrayInnerHTML = JSON.parse(str);
    }
    if (localStorage.getItem('style')) {
      let str = localStorage.getItem('style');
      style = JSON.parse(str);
    }

    if (localStorage.getItem('closeCell')) {
      closeCell = localStorage.getItem('closeCell');
    }
    if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme');
    }
    if (localStorage.getItem('level')) {
      level = localStorage.getItem('level');
    }
    if (localStorage.getItem('sec')) {
      sec = localStorage.getItem('sec');
    }
    if (localStorage.getItem('min')) {
      min = localStorage.getItem('min');
    }
    if (localStorage.getItem('hrs')) {
      hrs = localStorage.getItem('hrs');
    }
    if (localStorage.getItem('status')) {
      status = localStorage.getItem('status');
    }
    if (localStorage.getItem('countFlag')) {
      countFlag = localStorage.getItem('countFlag');
    }
    if (localStorage.getItem('countBomb')) {
      countBomb = localStorage.getItem('countBomb');
    }
  }

}





window.addEventListener("load", getLocalStorage);

export let arrayResultWin = [
  ['Сложный', 20, 15, 40],
  ['Легкий', 10, 5, 15],
  ['Средний', 25, 34, 24],
  ['Легкий', 14, 12, 33],
  ['Сложный', 30, 23, 15],
  ['Легкий', 10, 9, 3],
  ['Легкий', 10, 10, 10],
  ['Легкий', 10, 13, 5],
  ['Легкий', 10, 20, 15],
  ['Легкий', 11, 14, 8]
]

const startTime = () => {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
    if (min >= 60) {
      min = 0;
      hrs++;
    }
  }
}

const  addTime = () =>{
  startTime();
  let time = document.querySelector('.time');
  time.textContent = (hrs > 9 ? hrs : "0" + hrs)
    + ":" + (min > 9 ? min : "0" + min)
    + ":" + (sec > 9 ? sec : "0" + sec);
  timer();
}
const timer = () => {
  t = setTimeout(addTime, 1000);
}

const resetTime = () => {
  let time = document.querySelector('.time');
  time.textContent = "00:00:00";
  sec = 0;
  min = 0;
  hrs = 0;
}

const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
const audioWin = new Audio("./src/assets/sounds/win.mp3");
const audioLoss = new Audio("./src/assets/sounds/loss.mp3");



const createPage = () => {
  getLocalStorage()
  const header = createHeader();
  document.body.append(header);
  const game = createGame();
  document.body.append(game);
  const table = createTable();
  document.body.append(table);
}

createPage()


const gameField = document.querySelector('.game__field');


const createField = () => {
  cells = column * row;
  // let gameField = document.querySelector('.game__field');
  for (let i = 0; i < cells; i++ ) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (level === 'Сложный') {
      cell.classList.add('cell_difficult');
    }
    if (level === 'Средний') {
      cell.classList.add('cell_mid');
    }
    if (theme === 'Сетлая тема') {
      cell.classList.add('cell_dark');
    }
    gameField.append(cell);
  }
}

const createArrayBombs = (index) => {
  let bombs = [...Array(column * row).keys()]
  bombs.splice(index, 1)
  return bombs.sort(() => Math.random() - 0.5).slice(0, bomb);
}

const startGame = () => {
  createField();
}

startGame();


const checkCell = (indexX, indexY) => {
  return indexX >= 0 && indexY >= 0 && indexX < column && indexY < row;
}
const checkBomb = (indexX, indexY) => {
  if (checkCell(indexX, indexY)) {
    return bombsIndex.includes(indexY * column + indexX);
  } else {
    return false;
  }

}

const countNeighbors = (indexX, indexY) => {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (checkBomb(indexX + i, indexY + j)) {
        sum++;
      }
    }
  }
  return sum;
}


const showBombs = () => {
  const cellsArray = [...document.querySelectorAll('.cell')];
  for (let i = 0; i < bombsIndex.length; i ++) {
    if (theme === 'Сетлая тема') {
      cellsArray[bombsIndex[i]].classList.add('disabled_dark');
    }
    cellsArray[bombsIndex[i]].classList.add('disabled');
    cellsArray[bombsIndex[i]].textContent = '💣';
  }
}

const gameMessage = document.querySelector('.game__message');
const finishGame = (text) => {
  const gameField = document.querySelector('.game__field');
  gameField.removeEventListener('click', handlerClick);
  gameMessage.innerHTML = text;
}

const showNeighbors = (indexX, indexY, cell, neighbors) => {
  if (neighbors !== 0) {
    if (neighbors === 1) {
      cell.style.color = '#1770b7';
    }
    if (neighbors === 2) {
      cell.style.color = '#398b3b';
    }
    if (neighbors === 3) {
      cell.style.color = '#d51c1c';
    }
    if (neighbors === 4) {
      cell.style.color = '#d7c632';
    }
    if (neighbors === 5) {
      cell.style.color = '#673ab7';
    }
    if (neighbors === 6) {
      cell.style.color = '#795548';
    }
    if (neighbors === 7) {
      cell.style.color = '#CDDC39';
    }
    if (neighbors === 8) {
      cell.style.color = '#E91E63';
    }
    cell.textContent = neighbors;

  }
}

const changeTable = () => {
  let tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';
  for (let i = 0; i < arrayResultWin.length; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < arrayResultWin[i].length; j++) {
      const td = document.createElement('td');
      td.textContent = `${arrayResultWin[i][j]}`;
      tr.append(td);
    }
    tbody.append(tr);
  }


}
const writeWin = (seconds) => {
  let newRowTable = [level, bomb, step, seconds];
  arrayResultWin.pop();
  arrayResultWin.unshift(newRowTable);
  localStorage.setItem('arrayResultWin', JSON.stringify(arrayResultWin));
  changeTable();

}


const openCell = (indexX, indexY) => {
  if (checkCell(indexX, indexY)) {
    const cellsArray = [...document.querySelectorAll('.cell')];
    const index = indexY * column + indexX;
    const cell = cellsArray[index];
    if (cell.classList.contains('disabled')) return;
    if (theme === 'Сетлая тема') {
      cell.classList.add('disabled_dark');
    }
    cell.classList.add('disabled');
    const bombInd = checkBomb(indexX, indexY);
    closeCell -= 1;
    gameStatus.innerHTML = `Открыто ячеек: ${column * row - closeCell}/${column * row}`;
    let neighbors = countNeighbors(indexX, indexY);
    if (closeCell <= bomb) {
      showNeighbors(indexX, indexY, cell, neighbors);
      let seconds = sec + min * 60 + hrs * 60;
      let text = `Ура! Вы нашли все мины за ${seconds} секунд и ${step} ходов!`;
      writeWin(seconds);
      if (btnSound.classList.contains('btn_sound-on')) {
        audioWin.play();
      }
      finishGame(text);
      game = 'end';
      localStorage.setItem('game', game);
      resetTime();
      clearTimeout(t);
      return;
    }
    if (bombInd) {
      cell.textContent = '💣';
      if (btnSound.classList.contains('btn_sound-on')) {
        audioLoss.play();
      }
      showBombs();
      resetTime();
      clearTimeout(t);
      let text = 'Игра окончена. Попробуйте еще раз';
      finishGame(text);
      game = 'end';
      localStorage.setItem('game', game);
      return;
    }
    if (neighbors !== 0) {
      showNeighbors(indexX, indexY, cell, neighbors);
      return;
    }
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        openCell(indexX + i, indexY + j);
      }
    }
  }
}

const infoFlag = document.querySelector('.info__flag');
const handlerFlag = () => {
  if (!(infoFlag.classList.contains('info__flag_inset'))) {
    infoFlag.classList.add('info__flag_inset');
  } else {
    infoFlag.classList.remove('info__flag_inset');
  }

}
let bombInput = document.querySelector('.bomb__input');
let infoBombNumber = document.querySelector('.info__bomb-number');

const setFlag = (click) => {
  if (step === 0) {
    bomb = +bombInput.value;
  }
    infoBombNumber.textContent = `${bomb - +infoFlag.textContent}`;
  countFlag = infoFlag.innerHTML;
  countBomb = infoBombNumber.innerHTML;
  if (!(click.classList.contains('background-flag')) && (+countFlag < bomb)) {
    click.classList.add('background-flag');
    infoFlag.textContent = `${+countFlag + 1}`;
    infoBombNumber.textContent = `${+countBomb - 1}`;
  } else if (click.classList.contains('background-flag') && (+countFlag <= bomb)) {
    click.classList.remove('background-flag');
    infoFlag.textContent = `${+countFlag - 1}`;
    infoBombNumber.textContent = `${+countBomb + 1}`;
  }
}

const setNumberBombs = () => {
  bomb = bombInput.value;
  if (!(bomb >= 10 && bomb <= 99)) {
    alert(`Вы ввели ${bomb} бомб. В данной игре можно ввести от 10 до 99 бомб. Пожалуйста, введите корректное число бомб.` )
  }
}

const btnSound = document.querySelector('.btn');
const handlerClick = (e) => {
  const cells = [...document.querySelectorAll('.cell')];
    const click = e.target;
    if (click.classList.contains('cell') && click.classList.contains('disabled') && click.classList.contains('cell')) {
      if (btnSound.classList.contains('btn_sound-on')) {
        audio.play();
      }
      setFlag(click);
      return;
    }
    if (click.classList.contains('cell') && !(click.classList.contains('disabled'))) {
      if (btnSound.classList.contains('btn_sound-on')) {
        audio.play();
      }
      if (infoFlag.classList.contains('info__flag_inset')) {
        setFlag(click);
        return;
      }
      const index = cells.indexOf(click);
      const indexX = index % column;
      const indexY = (index - indexX) / column;
      if (step === 0) {
        game = 'go';
        localStorage.setItem('game', game);
        setNumberBombs();
        if (!(bomb >= 10 && bomb <= 99)) {
          return;
        }
        infoBombNumber.textContent = `${bomb - +infoFlag.innerHTML}`;
        bombsIndex = createArrayBombs(index);
        timer();
      }
      step++;
      openCell(indexX, indexY);
    }
}




infoFlag.addEventListener('click', handlerFlag);


gameField.addEventListener('click', handlerClick);

const gameStatus = document.querySelector('.game__status');
const newGame = () => {
  localStorage.clear();
  localStorage.setItem('arrayResultWin', JSON.stringify(arrayResultWin));
  game = 'end';
  localStorage.setItem('game', game);
  resetTime();
  clearTimeout(t);
  // let gameField = document.querySelector('.game__field');
  gameField.innerHTML = '';
  infoFlag.innerHTML = '0';
  bombInput.value = bomb;
  infoBombNumber.innerHTML = bomb;
  step = 0;
  bombsIndex = [];
  gameStatus.innerHTML = 'Чтобы начать, нажмите на любую ячейку игрового поля';
  gameMessage.innerHTML = '';
  closeCell = column * row;
  startGame();
  gameField.addEventListener('click', handlerClick);
}
const selectionLeven = () => {
  const game = document.querySelector('.game');
  const gameField = document.querySelector('.game__field');
  localStorage.clear();
  localStorage.setItem('arrayResultWin', JSON.stringify(arrayResultWin));
  if (level === 'Средний') {
    column = 15;
    row = 15;
    newGame();
    game.style.maxWidth = '620px';
    gameField.style.maxWidth = '600px';
  } else if (level === 'Сложный') {
    column = 25;
    row = 25;
    newGame();
    game.style.maxWidth = '770px';
    gameField.style.maxWidth = '750px';
  }
  else if (level === 'Легкий') {
    column = 10;
    row = 10;
    newGame();
    game.style.maxWidth = '420px';
    gameField.style.maxWidth = '400px';
  }
}


const handlerMenu = (e) => {
  if (e.target.classList.contains('nav__item')) {
    const menuItem = document.querySelectorAll('.nav__item');
    menuItem.forEach(i => {
      i.classList.remove('nav__item_active');
    })
    e.target.classList.add('nav__item_active');
    level = e.target.innerHTML;
    selectionLeven();
  }
}

const menu = document.querySelector('.nav');
menu.addEventListener('click', handlerMenu);

const buttonNewGame = document.querySelector('.new-game')



buttonNewGame.addEventListener('click', newGame);

const switchSound = (e) => {
  const clickBtnSound = e.target;
  if (clickBtnSound.classList.contains('btn_sound-on')) {
    clickBtnSound.classList.remove('btn_sound-on');
    clickBtnSound.classList.add('btn_sound-off');
    clickBtnSound.title = 'Включить звук';
  } else {
    clickBtnSound.classList.add('btn_sound-on');
    clickBtnSound.classList.remove('btn_sound-off');
    clickBtnSound.title = 'Выключить звук';
  }
}


btnSound.addEventListener('click', switchSound);

const btnTheme = document.querySelector('.btn_theme');


const changeThemeCells = () => {
  const cells = document.querySelectorAll('.cell');
  if (theme === 'Сетлая тема') {
    cells.forEach(i => {
      if (i.classList.contains('disabled')) {
        i.classList.add('disabled_dark');
      } else {
        i.classList.add('cell_dark');
      }
    })
  } else {
    cells.forEach(i => {
      i.classList.remove('cell_dark');
      i.classList.remove('disabled_dark');
    })
  }
}

const setTheme = (e) => {

  const gameWrapper = document.querySelector('.game');
  const click = e.target;
  if (click.innerHTML === 'Темная тема') {
    click.innerHTML = 'Сетлая тема';
    theme = 'Сетлая тема';
    // click.classList.add('game_dark-theme')
    gameWrapper.classList.add('game_dark-theme');
  } else {
    click.innerHTML = 'Темная тема';
    theme = 'Темная тема';
    // click.classList.remove('game_dark-theme')
    gameWrapper.classList.remove('game_dark-theme');
  }
  changeThemeCells();
}


btnTheme.addEventListener('click', setTheme);

const changeLevel = () => {
  const menuItem = document.querySelectorAll('.nav__item');
  menuItem.forEach(i => {
    i.classList.remove('nav__item_active');
    if (i.innerHTML === level) {
      i.classList.add('nav__item_active');
    }
  })
}

const btnContinue = document.querySelector('.continue');
const continueTime = () => {
  timer();
  gameField.addEventListener('click', handlerClick);
  btnContinue.removeEventListener('click',  continueTime);
}
const restoreField = () => {
  const game = document.querySelector('.game');
  const btnTheme = document.querySelector('.btn_theme');
  btnTheme.innerHTML = theme;
  infoFlag.innerHTML = countFlag;
  infoBombNumber.innerHTML = countBomb;
  gameStatus.innerHTML = status;
  bombInput.value = bomb;
  let time = document.querySelector('.time');
  time.textContent = timeInner;
  game.className = gameClass;

  btnContinue.addEventListener('click', continueTime);
  const gameField = document.querySelector('.game__field');
  if (gameStyle) {
    game.style.maxWidth = gameStyle;
  }
  if (gameFieldStyle) {
    gameField.style.maxWidth = gameFieldStyle;
  }
  const cell = document.querySelectorAll('.cell');
  for (let i = 0; i < cell.length; i++) {
    cell[i].className = arrayClasses[i];
    cell[i].innerHTML = arrayInnerHTML[i];
    cell[i].style.color = style[i];
  }
  changeThemeCells();
  changeLevel();
  gameField.removeEventListener('click', handlerClick);
}


if (game === 'go') {
  restoreField();
}