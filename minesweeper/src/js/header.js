const CssClasses = {
  header: ['header', 'container'],
  title: 'header__title',
  nav: 'header__nav',
  ul: 'nav',
  li: 'nav__item',
  LiActive: 'nav__item_active',
  headerButton: 'header__button',
  newGame: 'new-game',
  btnContinue: 'continue',
  settings: 'settings',
  btnSound: ['btn', 'btn_sound-on'],
  btnTheme: ['btn', 'btn_theme'],

};


function createElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}
function createHeader() {
  const component = createElement('header', CssClasses.header[0]);
  component.classList.add(CssClasses.header[1]);

  const title = createElement('div', CssClasses.title);
  title.textContent = 'Сапёр';
  component.append(title);

  const nav = createElement('nav', CssClasses.nav);
  const ul = createElement('ul', CssClasses.ul);

  const li = createElement('li', CssClasses.li);
  li.classList.add(CssClasses.LiActive)
  li.textContent = 'Легкий';
  ul.append(li)
  const li2 = createElement('li', CssClasses.li);
  li2.textContent = 'Средний';
  ul.append(li2)
  const li3 = createElement('li', CssClasses.li);
  li3.textContent = 'Сложный';
  ul.append(li3)
  nav.append(ul);

  component.append(nav);

  const headerButton = createElement('div', CssClasses.headerButton);
  component.append(headerButton);

  const newGame = createElement('button', CssClasses.newGame);
  newGame.textContent = 'Новая игра';
  headerButton.append(newGame);

  const btnContinue = createElement('button', CssClasses.btnContinue);
  btnContinue.textContent = 'Продолжить';
  headerButton.append(btnContinue);

  const settings = createElement('div', CssClasses.settings);
  headerButton.append(settings);

  const btnSound = createElement('button', CssClasses.btnSound[0]);
  btnSound.classList.add(CssClasses.btnSound[1]);
  settings.append(btnSound);

  const btnTheme = createElement('button', CssClasses.btnTheme[0]);
  btnTheme.classList.add(CssClasses.btnTheme[1]);
  btnTheme.textContent = 'Темная тема';
  settings.append(btnTheme);

  return component;
}

export { createHeader };