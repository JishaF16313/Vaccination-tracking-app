import { combineReducers } from 'redux';
import hospitals from './hospitals/index';
import hospitalusers from './hospitalusers/index';
import vaccination from './vaccination';
import auth from "./auth";
import hospitalbranch from './hospitalbranch/index';
import loader from './loader/index';
import alert from './alert/index';

export default combineReducers({
    hospitals,
    hospitalusers,
    vaccination,
    auth,
    hospitalbranch,
    loader,
    alert
});
