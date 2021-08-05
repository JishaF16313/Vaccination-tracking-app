import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"


const UserRoutes = () => 
<Switch>
    <Route path ="/" /> {/* General user dashboard */}
    <Redirect from="/" to="/" /> {/* Redirects unkown paths to dashboard  */}
</Switch>

export default UserRoutes
