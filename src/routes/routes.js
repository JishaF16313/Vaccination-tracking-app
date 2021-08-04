import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import PrivateRoute from "./privateRoute";
import AddUpdateHospital from '../components/hospitals/addUpdateHospital';
import VaccinationDashboard from "../components/dashboard/vaccination";
import SignIn from "../components/signIn/signIn";
import HospitalAdmin from '../components/dashboard/hospitalAdminDashboard'
import UserDashboard from "../components/userDashboard";

function Routes() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                  <Route component={AddUpdateHospital} path="/addupdatehospital" />
                  <Route component={VaccinationDashboard} path="/vaccination"/>
                  <Route component={SignIn} path="/signIn" />
                  <Route component={HospitalAdmin} path="/hospitaladmin" />
                  <Route component={UserDashboard} path="/userDashboard"/>
                  {/* Add Private Router  */}
                  {/* <PrivateRoute component={AddUpdateHospital} path="/addupdatehospital" /> */}
                  {/* <Route component={UserDashboard} path="/userDashboard"/> */}
                </Switch>
            </Router>
        </div>
    )
}

export default Routes;


