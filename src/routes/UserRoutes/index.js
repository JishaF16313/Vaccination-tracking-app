import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"

import UserDashboard from "../../components/userDashboard"


const UserRoutes = () => 
<Switch>
    <Route path ="/" component={UserDashboard} /> {/* General user dashboard */}
    <Redirect from="/" to="/" /> {/* Redirects unkown paths to dashboard  */}
</Switch>

export default UserRoutes
