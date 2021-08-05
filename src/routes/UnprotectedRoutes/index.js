import React from "react"
import {Switch, Route} from "react-router-dom"

import SignIn from "../../components/signIn/signIn"


const UnprotectedRoutes = () =>  <Switch>
    <Route path ="/" exact component={SignIn}  /> {/* to be changed to General Dashboard  */}
    <Route path="/register" />
    <Route path="/" component={SignIn}/>
</Switch>

export default UnprotectedRoutes
