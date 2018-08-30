
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension' // dev

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const preLoadedState = {
    trades: []
};

let middleware = [thunk];
const store = createStore(rootReducer, preLoadedState, composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
));

export default store;