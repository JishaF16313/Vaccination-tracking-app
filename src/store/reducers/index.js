import { combineReducers } from 'redux';
import hospitals from './hospitals/index';
import hospitalusers from './hospitalusers/index';
import vaccination from './vaccination';
import auth from "./auth";
import hospitalbranch from './hospitalbranch/index';
import loader from './loader/index';
import alert from './alert/index';
import users from './users/index';
import patientReducer from './hospitalAdmin/index';
import dashboard from './dashboard/index';
import patientdetails from './patientDetails/index';
import schedulevaccination from './schedulevaccination/index';

export default combineReducers({
    hospitals,
    hospitalusers,
    vaccination,
    auth,
    hospitalbranch,
    loader,
    alert,
    users,
    patientReducer,
    dashboard,
    patientdetails,
    schedulevaccination
});
