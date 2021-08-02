import { combineReducers } from 'redux';
import hospitals from './hospitals/index';
import users from './users/index';

export default combineReducers({
    hospitals,
    users
});
