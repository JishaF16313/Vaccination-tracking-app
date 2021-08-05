import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"

import VaccinationDashboard from "../../components/dashboard/vaccination"


const VaccinationAdminRoutes = () => 
<Switch>
    <Route path ="/" exact component={VaccinationDashboard}/>
    <Redirect from ="/" to="/" />
</Switch>

export default VaccinationAdminRoutes
