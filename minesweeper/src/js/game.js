

const CssClasses = {
  main: ['main', 'container'],
  game: 'game',
  gameScoreboard: 'game__scoreboard',
  bomb: 'bomb',
  bombInput: 'bomb__input',
  bombImg: 'bomb__img',
  info: 'info',
  infoFlag: 'info__flag',
  infoBomb: 'info__bomb',
  infoBombNumber: 'info__bomb-number',
  infoBombImg: 'info__bomb-img',
  time: 'time',
  gameField: 'game__field',
  cell: 'cell',
  gameFooter: 'game__footer',
  gameStatus: 'game__status',
  gameMessage: 'game__message',

};

function createElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

function createGame() {
  const component = createElement('main', CssClasses.main[0]);
  component.classList.add(CssClasses.main[1]);

  const game = createElement('div', CssClasses.game);
  component.append(game);

  const gameScoreboard = createElement('div', CssClasses.gameScoreboard);
  game.append(gameScoreboard);

  const bomb = createElement('div', CssClasses.bomb);
  gameScoreboard.append(bomb);

  const bombInput = createElement('input', CssClasses.bombInput);
  bombInput.type = 'number';
  bombInput.min = 10;
  bombInput.max = 99;
  bombInput.step = 1;
  bombInput.value = 10;
  bomb.append(bombInput);

  const bombImg = createElement('div', CssClasses.bombImg);
  bombImg.textContent = '💣';
  bomb.append(bombImg);

  const info = createElement('div', CssClasses.info);
  gameScoreboard.append(info);

  const infoFlag = createElement('button', CssClasses.infoFlag);
  infoFlag.textContent = '0';
  info.append(infoFlag);

  const infoBomb = createElement('div', CssClasses.infoBomb);
  info.append(infoBomb);

  const infoBombNumber = createElement('div', CssClasses.infoBombNumber);
  infoBombNumber.textContent = '10';
  infoBomb.append(infoBombNumber);

  const infoBombImg = createElement('div', CssClasses.infoBombImg);
  infoBombImg.textContent = '💣';
  infoBomb.append(infoBombImg);

  // const btn = createElement('button', CssClasses.btn[0]);
  // btn.classList.add(CssClasses.btn[1]);
  // btn.title = 'Выключить звук'
  // gameScoreboard.append(btn);

  const time = createElement('div', CssClasses.time);
  time.textContent = '00:00:00';
  gameScoreboard.append(time);

  const gameField = createElement('div', CssClasses.gameField);
  game.append(gameField);

  const gameFooter = createElement('div', CssClasses.gameFooter);
  game.append(gameFooter);

  const gameStatus = createElement('div', CssClasses.gameStatus);
  gameStatus.textContent = 'Чтобы начать, нажмите на любую ячейку игрового поля';
  gameFooter.append(gameStatus);

  const gameMessage = createElement('div', CssClasses.gameMessage);
  gameFooter.append(gameMessage);

  return component;
}

export { createGame };