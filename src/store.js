import Dispatcher from './Dispatcher';
import EventEmitter from 'events';

// todo items sample data
import * as data from './api/data';
import update from 'immutability-helper';
import moment from 'moment';
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
          };

          dataSet.todayCount = dataSet.todoItems.filter((value, index) => value.created_at <= moment().add(0, 'days').format('YYYY-MM-DD')).length;            
          dataSet.weekCount = dataSet.todoItems.filter((value, index) => value.created_at <= moment().add(7, 'days').format('YYYY-MM-DD')).length;            

          this.emit('change');
        break;
        
        case 'CREATE_TODOITEMS':
          // immutability-helper 적용하기
          dataSet.todoItems.push(action.value)

          dataSet.totalCount =  dataSet.todoItems.length;
          dataSet.todayCount = dataSet.todoItems.filter((value, index) => value.created_at <= moment().add(0, 'days').format('YYYY-MM-DD')).length;            
          dataSet.weekCount = dataSet.todoItems.filter((value, index) => value.created_at <= moment().add(7, 'days').format('YYYY-MM-DD')).length;            
          this.emit('change');
        break;
        
        case 'UPDATE_TODOITEMS':
          // immutability-helper 적용하기
          dataSet.todoItems = dataSet.todoItems.map((item) => {
            if (item.id === action.value.id) {
              item.active = action.value.active;
            }

            return item;
          })
          
          this.emit('change');
        break;

        case 'DELETE_TODOITEMS':
          // immutability-helper 적용하기
          dataSet.todoItems = dataSet.todoItems.filter((item) => action.id !== item.id);
          
          dataSet.totalCount =  dataSet.todoItems.length;
          dataSet.todayCount = dataSet.todoItems.filter((value, index) => value.created_at <= moment().add(0, 'days').format('YYYY-MM-DD')).length;            
          dataSet.weekCount = dataSet.todoItems.filter((value, index) => value.created_at <= moment().add(7, 'days').format('YYYY-MM-DD')).length;                  
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