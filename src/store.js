import Dispatcher from './Dispatcher';
import EventEmitter from 'events';

const initialState = {
  currentUser: null
}
let data = {
  ...initialState
}
class Store extends EventEmitter {
  constructor() {
    super();

    Dispatcher.register(action => {
      
      switch(action.type) {
        case 'FETCH_CURRENTUSER':
          data = {
            currentUser: action.value
          }

          this.emit('change');
        break;

        case 'RESET_CURRENTUSER':
          data = { ...initialState };        
          this.emit('change');
        break;

        default:
      }
    })
  }

  getState() {
    return data;
  }
}

export default new Store();