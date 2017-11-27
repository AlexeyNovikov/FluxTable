import Store from './Store';

const Actions = {
  savedData: null,
  curSortParams: null,

  startSearch(ev) {
    if (ev.target.value) return;
    this.savedData = Store.getData();
  },

  endSearch(ev) {
    if (ev.target.value) return;
    this.savedData = null;
  },

  searchChange(ev, searchField) {
    const searchWord = ev.target.value.toLowerCase();

    const searchedData = this.savedData.filter((row) => {
      return row[searchField].toString().toLowerCase().indexOf(searchWord) > -1 ? true : false;
    });

    // Эти 7 строчек после этого комментария решают проблему с удалением символов из поиска,
    // но при этом отсутствия повторной сортировки. Сортировка включается установкой в методе
    // sortData параметра curSortParams. Отсюда следует, что если он есть, то нужно ранжировать
    // таблицу по новой при поиске. Но тут происходит два повторных вызова Store.setData() и,
    // соответственно, две отрисовки таблицы подряд(хотя, при увеличении количества символов
    // этого можно было бы избежать, но реализовывать эту оптимизацию чет не оч охота хах), но
    // можем это как-то оптимизирует реакт внутри и реализация оптимизации не нужна, я не знаю как это проверить.
    if (!this.curSortParams) {
      Store.setData(searchedData);
      return;
    } else {
      Store.setData(searchedData);
      this.sortData(this.curSortParams);
    }
  },

  sortData({field, direction}) {
    let data = Store.getData();
    let sortedData;

    this.curSortParams = {
      field,
      direction
    }

    switch (field) {
      case 'price': {
        sortedData = data.sort((a, b) => {
          if (direction === 'down') {
            return Number(b[field]) - Number(a[field]);
          } else if (direction === 'up') {
            return Number(a[field]) - Number(b[field]);
          } else {
            throw new Error('Check out SelectAndSort module for the options values');
          }
        });
        break;
      }
      case 'date': {
        sortedData = data.sort((a, b) => {
          if (direction === 'down') {
            return Date.parse(b[field]) - Date.parse(a[field]);
          } else if (direction === 'up') {
            return Date.parse(a[field]) - Date.parse(b[field]);
          } else {
            throw new Error('Check out SelectAndSort module for the options values');
          }
        });
        break;
      }
      default: {
        sortedData = data.sort((a, b) => {
          if (direction === 'down') {
            return a[field] < b[field] ? 1 : -1;
          } else if (direction === 'up') {
            return a[field] > b[field] ? 1 : -1;
          } else {
            throw new Error('Check out SelectAndSort module for the options values');
          }
        });
      }
    }

    Store.setData(sortedData);
  }
};

export default Actions
