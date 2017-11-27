import {EventEmitter} from 'fbemitter';
import ex from '../source/ex.json';

const emitter = new EventEmitter();
function getDataSomeWhere() {}
let data = getDataSomeWhere(); // получаем откуда-то информацию
const tableHeaders = ['Наименование поездки', 'Время поездки', 'Тип поездки', 'Цена поездки'];

if (!data) { // если ее нет, то берем из тестового файла ex.json
  data = ex;
}

const Store = {
  getHeaders() {
    return tableHeaders;
  },

  getData() {
    return data;
  },

  setData(newData) {
    data = newData;

    emitter.emit('change');
  },

  addListener(eventType, fn) {
    emitter.addListener(eventType, fn);
  }
};

export default Store
