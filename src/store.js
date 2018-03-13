import Dispatcher from './Dispatcher';
import EventEmitter from 'events';

// todo items sample data
import * as data from './api/data';

const initialState = {
  currentUser: null,
  todoItems: [],
  totalCount: 0,
  todayCount: 0,
  weekCount: 0
}
let dataSet = {
  ...initialState
}
class Store extends EventEmitter {
  constructor() {
    super();

    Dispatcher.register(action => {
      
      switch(action.type) {
        case 'FETCH_CURRENTUSER':
          dataSet = {
            currentUser: action.value
          }

          this.emit('change');
        break;

        case 'RESET_CURRENTUSER':
          dataSet = { ...initialState };        
          this.emit('change');
        break;
        
        case 'FETCH_TODOITEMS':
          dataSet = { ...initialState, todoItems: data.todoItems() };
          this.emit('change');
        break;

        case 'FETCH_FILTERED_TODOITEMS':
          console.log('해당 필터 조건으로 데이터 필터링')
          this.emit('change');
        break;

        default:
      }
    })
  }

  getState() {
    return dataSet;
  }
}

export default new Store();