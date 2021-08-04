import { combineReducers } from 'redux';
import hospitals from './hospitals/index';
import users from './users/index';
import vaccination from './vaccination';

export default combineReducers({
    hospitals,
    users,
    vaccination
});
