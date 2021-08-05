import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"

import HospitalAdminDashboard from "../../components/dashboard/hospitalAdminDashboard"


const HospitalAdminRoutes = () => 
<Switch>
    <Route path ="/" exact component={HospitalAdminDashboard}/> {/* Hospital Admin Dashboard */}
    <Redirect from="/" to="/"/> {/* Redirects unkown paths to dashboard  */}
</Switch>

export default HospitalAdminRoutes
