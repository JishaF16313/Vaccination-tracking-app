import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import AddUpdateHospital from '../components/hospitals/addUpdateHospital';
import VaccinationDashboard from "../components/vaccinationDashboard";

function Routes() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                  <Route component={AddUpdateHospital} path="/addupdatehospital" />
                  <Route component={VaccinationDashboard} path="/vaccination"/>
                </Switch>
            </Router>
        </div>
    )
}

export default Routes;
