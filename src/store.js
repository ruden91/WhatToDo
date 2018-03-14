import Dispatcher from './Dispatcher';
import EventEmitter from 'events';

// todo items sample data
import * as data from './api/data';

// initial State
const initialState = {
  currentUser: null,
  todoItems: [],
  totalCount: 0,
  todayCount: 0,
  weekCount: 0
}

// copied dataSet
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
          dataSet = { 
            ...initialState, 
            todoItems: data.todoItems(),
            totalCount: data.todoItems().length,
            todayCount: data.todoItems().filter((value, index) => index < 5).length,
            weekCount: data.todoItems().filter((value, index) => index < 8).length
          };
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