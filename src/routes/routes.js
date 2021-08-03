import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import PrivateRoute from "./privateRoute";
import AddUpdateHospital from '../components/hospitals/addUpdateHospital';

function Routes() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                  <Route component={AddUpdateHospital} path="/addupdatehospital" />
                  {/* Add Private Router  */}
                  {/* <PrivateRoute component={AddUpdateHospital} path="/addupdatehospital" /> */}
                </Switch>
            </Router>
        </div>
    )
}

export default Routes;
