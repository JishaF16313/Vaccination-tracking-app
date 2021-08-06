import { Route, Router , Switch } from "react-router-dom";
import history from './history';
import PrivateRoute from "./privateRoute";
import Redirects from "./redirects"
import Role from "../lib/roles";
import GeneralDashboard from "../components/dashboard/generalDashboard"
import AddUpdateHospital from '../components/hospitals/addUpdateHospital';
import VaccinationDashboard from "../components/dashboard/vaccination";
import SignIn from "../components/signIn/signIn";
import HospitalAdmin from '../components/dashboard/hospitalAdminDashboard'
import UserDashboard from "../components/userDashboard";
import AddUpdateHospitalUser from '../components/hospitalusers/addupdateuser';
import HospitalDashboard from '../components/hospitals/index';
import HospitalUserDashboard from '../components/hospitalusers/index';

function PrivateRoutes() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                  <Route component={GeneralDashboard} path="/" exact/>
                  <Route component={SignIn} path="/signIn" />
                  <PrivateRoute component={AddUpdateHospital} roles={[Role.Admin]} path="/addupdatehospital" />
                  <PrivateRoute component={VaccinationDashboard} roles={[Role.VcAdmin]} path="/vaccination"/>
                  <PrivateRoute component={HospitalAdmin} roles={[Role.HoAdmin]} path="/hospitaladmin" />
                  <PrivateRoute component={UserDashboard} roles={[Role.User]} path="/userDashboard"/>
                  <PrivateRoute component={HospitalDashboard} roles={[Role.Admin]} path="/hospitals" />
                  <PrivateRoute component={HospitalUserDashboard} roles={[Role.Admin]} path="/hospital/users" />
                  {/* Add Private PrivateRouter  */}
                  {/* <PrivatePrivateRoute component={AddUpdateHospital} path="/addupdatehospital" /> */}
                  {/* <PrivateRoute component={UserDashboard} path="/userDashboard"/> */}
                  {/* <PrivateRoute component={HospitalAdmin} path="/hospitaladmin" /> */}
                  <PrivateRoute component={AddUpdateHospitalUser} roles={[Role.Admin]} path="/hospital/addupdateuser" />
                  {/* Add Private PrivateRouter  */}
                  <PrivateRoute component={HospitalAdmin} roles={[Role.HoAdmin]} path="/hospitaladmin" />
                  <Route path="/redirect" exact component={Redirects}/>
                </Switch>
            </Router>
        </div>
    )
}

export default PrivateRoutes;

