import {arrayResultWin} from '../index';

const CssClasses = {
  footer: ['footer', 'container'],
  table: 'table',
  tbody: 'tbody'
};

const array = ['Уровень', 'К-во бомб', 'К-во ходов', 'Время(сек.)']
function createElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}


function createTable() {
  const component = createElement('footer', CssClasses.footer[0]);
  component.classList.add(CssClasses.footer[1]);

  const table = createElement('table', CssClasses.table);
  component.append(table);

  const thead = document.createElement('thead');
  table.append(thead);

  const tr = document.createElement('tr');
  thead.append(tr);
  for (let i = 0; i < array.length; i++) {
    const th = document.createElement('th');
    th.textContent = `${array[i]}`;
    tr.append(th);
  }

  const tbody = createElement('tbody', CssClasses.tbody);

  table.append(tbody);

  for (let i = 0; i < arrayResultWin.length; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < arrayResultWin[i].length; j++) {
      const td = document.createElement('td');
      td.textContent = `${arrayResultWin[i][j]}`;
      tr.append(td);
    }
    tbody.append(tr);
  }


  return component;
}

export { createTable };