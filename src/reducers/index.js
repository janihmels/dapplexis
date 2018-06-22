import { combineReducers } from 'redux';
// --------------------------------------------------------------
import storeReducer from '../redux/store/reducer';

// --------------------------------------------------------------
const rootReducer = combineReducers({
  store: storeReducer
});
// --------------------------------------------------------------
export default rootReducer;