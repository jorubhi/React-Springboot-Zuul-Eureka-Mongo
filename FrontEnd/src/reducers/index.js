import { combineReducers } from 'redux';
import { tradesReducer } from './trades';

const rootReducer = combineReducers({
    trades: tradesReducer,
    tradesH: tradesReducer,
    tradesM: tradesReducer
});



export default rootReducer;