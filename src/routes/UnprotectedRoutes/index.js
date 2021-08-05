import React from "react"
import {Switch, Route} from "react-router-dom"

import SignIn from "../../components/signIn/signIn"
import AddUpdateUser from '../../components/users/addupdateuser';


const UnprotectedRoutes = () =>  <Switch>
    <Route path ="/" exact component={SignIn}  /> {/* to be changed to General Dashboard  */}
    <Route path="/register" component={AddUpdateUser} />
    <Route path="/" component={SignIn}/>
</Switch>

export default UnprotectedRoutes
