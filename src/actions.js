import Dispatcher from './Dispatcher';
import { uniqueId } from 'lodash';
import moment from 'moment';
import { random } from 'lodash';

export const fetchCurrentUser = (value) => {
  const action = { type: 'FETCH_CURRENTUSER', value };

  Dispatcher.dispatch(action); 
}

export const resetCurrentUser = () => {
  const action = { type: 'RESET_CURRENTUSER' }

  Dispatcher.dispatch(action);
}

// fetch todoItems
export const fetchTodoItems = (value) => {
  const action = { type: 'FETCH_TODOITEMS' };

  Dispatcher.dispatch(action);
}

// create todoItem
export const createTodoItems = (value) => {
  value = {
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    id: uniqueId(),
    created_at: moment().add(random(0, 30), 'days').format('YYYY-MM-DD'),
    active: false    
  };

  const action = { type: 'CREATE_TODOITEMS', value };

  Dispatcher.dispatch(action);
}

// update todoItem
export const updateTodoItems = (value) => {
  const action = { type: 'UPDATE_TODOITEMS', value };

  Dispatcher.dispatch(action);
}

// delete todoItem
export const deleteTodoItems = (id) => {
  const action = { type: 'DELETE_TODOITEMS', id };

  Dispatcher.dispatch(action);
}
