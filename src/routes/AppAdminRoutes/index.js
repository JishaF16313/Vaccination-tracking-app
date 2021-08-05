import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"

import AddUpdateHospital from '../../components/hospitals/addUpdateHospital';


const AppAdminRoutes = () => 
<Switch>
    <Route path="/" exact component={AddUpdateHospital} /> {/* To be replaced by the dashboard component */}
    <Route component={AddUpdateHospital} path="/addupdatehospital" />
    <Redirect from ="/" to="/" /> {/* Redirects unkown paths to dashboard  */}
</Switch>

export default AppAdminRoutes
