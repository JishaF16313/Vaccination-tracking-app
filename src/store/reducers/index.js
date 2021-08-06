import { combineReducers } from 'redux';
import hospitals from './hospitals/index';
import hospitalusers from './hospitalusers/index';
import vaccination from './vaccination';
import auth from "./auth"

export default combineReducers({
    hospitals,
    hospitalusers,
    vaccination,
    auth
});
