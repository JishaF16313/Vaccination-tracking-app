import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"

import AddUpdateHospital from '../../components/hospitals/addUpdateHospital';
import HospitalDashboard from "../../components/hospitals/index"
import HospitalUserDashboard from "../../components/hospitalusers/index"
import AddUpdateHospitalUser from "../../components/hospitalusers/addupdateuser";


const AppAdminRoutes = () => 
<Switch>
    <Route path="/hospitals" exact component={HospitalDashboard} /> {/* To be replaced by the dashboard component */}
    <Route path="/hospital/users" component={HospitalUserDashboard}/>
    <Route path="/addupdatehospital" component={AddUpdateHospital} />
    <Route path="/addupdateuser" component={AddUpdateHospitalUser}/>
    <Redirect from ="/" to="/hospitals" /> {/* Redirects unkown paths to dashboard  */}
</Switch>

export default AppAdminRoutes
