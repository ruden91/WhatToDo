import Dispatcher from './Dispatcher';

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

// fetch filtered todoItems
export const fetchFilteredTodoItems = (value) => {
  const action = { type: 'FETCH_FILTERED_TODOITEMS', value };

  Dispatcher.dispatch(action);
}