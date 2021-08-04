import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import PrivateRoute from "./privateRoute";
import AddUpdateHospital from '../components/hospitals/addUpdateHospital';
import VaccinationDashboard from "../components/vaccinationDashboard";
// import SignIn from "../components/signIn/signIn";
import UserDashboard from "../components/userDashboard";

function Routes() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                  <Route component={AddUpdateHospital} path="/addupdatehospital" />
                  <Route component={VaccinationDashboard} path="/vaccination"/>
                  <Route component={UserDashboard} path="/userDashboard"/>
                  {/* <Route component={SignIn} path="/signIn" /> */}
                  {/* Add Private Router  */}
                  {/* <PrivateRoute component={AddUpdateHospital} path="/addupdatehospital" /> */}
                  {/* <Route component={UserDashboard} path="/userDashboard"/> */}
                </Switch>
            </Router>
        </div>
    )
}

export default Routes;
