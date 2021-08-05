import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import PrivateRoute from "./privateRoute";
import Role from "../lib/roles";
import AddUpdateHospital from '../components/hospitals/addUpdateHospital';
import VaccinationDashboard from "../components/dashboard/vaccination";
import SignIn from "../components/signIn/signIn";
import HospitalAdmin from '../components/dashboard/hospitalAdminDashboard'
import UserDashboard from "../components/userDashboard";
import AddUpdateHospitalUser from '../components/hospitalusers/addupdateuser';
import HospitalDashboard from '../components/hospitals/index';
import HospitalUserDashboard from '../components/hospitalusers/index';

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
                  <Route component={HospitalDashboard} path="/hospitals" />
                  <Route component={HospitalUserDashboard} path="/hospital/users" />
                  {/* Add Private Router  */}
                  {/* <PrivateRoute component={AddUpdateHospital} path="/addupdatehospital" /> */}
                  {/* <Route component={UserDashboard} path="/userDashboard"/> */}
                  {/* <Route component={HospitalAdmin} path="/hospitaladmin" /> */}
                  <Route component={AddUpdateHospitalUser} path="/hospital/addupdateuser" />
                  {/* Add Private Router  */}
                  <PrivateRoute component={HospitalAdmin} roles={[Role.HoAdmin]} path="/hospitaladmin" />
                </Switch>
            </Router>
        </div>
    )
}

export default Routes;


