import { Router, Route, Switch } from "react-router-dom";
import history from './history';

function Routes() {
    return (
        <div>
            <Router history={history}>
                <Switch>

                </Switch>
            </Router>
        </div>
    )
}

export default Routes;
