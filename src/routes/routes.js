import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import PrivateRoute from "./privateRoute";
import AddUpdateHospital from '../components/hospitals/addUpdateHospital';
import VaccinationDashboard from "../components/vaccinationDashboard";

function Routes() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                  <Route component={AddUpdateHospital} path="/addupdatehospital" />
                  <Route component={VaccinationDashboard} path="/vaccination"/>
                  {/* Add Private Router  */}
                  {/* <PrivateRoute component={AddUpdateHospital} path="/addupdatehospital" /> */}
                </Switch>
            </Router>
        </div>
    )
}

export default Routes;
