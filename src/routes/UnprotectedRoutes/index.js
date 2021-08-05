import React from "react"
import {Switch, Route} from "react-router-dom"

import SignIn from "../../components/signIn/signIn"
import GeneralDashboard from "../../components/dashboard/generalDashboard"


const UnprotectedRoutes = () =>  <Switch>
    <Route path ="/" exact component={GeneralDashboard}  /> {/* to be changed to General Dashboard  */}
    <Route path="/register" />
    <Route path="/" component={SignIn}/>
</Switch>

export default UnprotectedRoutes
