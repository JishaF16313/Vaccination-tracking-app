import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducers/index';
//import dev tools extension
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
