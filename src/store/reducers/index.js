import { combineReducers } from 'redux';
import hospitals from './hospitals/index';
import hospitalusers from './hospitalusers/index';
import vaccination from './vaccination';
import auth from "./auth";
import hospitalbranch from './hospitalbranch/index';
import users from './users/index';

export default combineReducers({
    hospitals,
    hospitalusers,
    vaccination,
    auth,
    hospitalbranch,
    users
});
