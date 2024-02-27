import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import homeReducer from './homeReducer';

const store = createStore(homeReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
