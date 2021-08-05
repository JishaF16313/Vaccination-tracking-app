import { Route, Switch } from "react-router-dom";
import {useSelector} from "react-redux"
import PrivateRoute from "./privateRoute";
import Role from "../lib/roles";
import VaccinationDashboard from "../components/dashboard/vaccination";
import SignIn from "../components/signIn/signIn";
import HospitalAdmin from '../components/dashboard/hospitalAdminDashboard'
import AddUpdateUser from '../components/users/addupdateuser';

import UnprotectedRoutes from "./UnprotectedRoutes";
import HospitalAdminRoutes from "./HospitalAdminRoutes";
import VaccinationAdminRoutes from "./VaccinationAdminRoutes";
import UserRoutes from "./UserRoutes"
import AppAdminRoutes from "./AppAdminRoutes";

function Routes() {
  const {role, isAuthenticated} = useSelector(store => store.users)

  if(!isAuthenticated) return <UnprotectedRoutes/>

  switch(role)
  {
    case Role.HoAdmin:
      return <HospitalAdminRoutes/>

    case Role.VcAdmin:
      return <VaccinationAdminRoutes/>

    case Role.User:
      return <UserRoutes/>

    case Role.Admin:
      return <AppAdminRoutes/>
  }
    // return (
    //             <Switch>
    //               <Route component={AddUpdateHospital} path="/addupdatehospital" />
    //               <Route component={SignIn} path="/signIn" />
    //               {/* <Route component={HospitalAdmin} path="/hospitaladmin" /> */}
    //               <Route component={AddUpdateUser} path="/addupdateuser" />
    //               {/* Add Private Router  */}
    //               <PrivateRoute component={HospitalAdmin} roles={[Role.HoAdmin]} path="/hospitaladmin" />
    //               <PrivateRoute roles={[Role.VcAdmin]} component={VaccinationDashboard} path="/vaccination"/>
    //             </Switch>
    // )
}

export default Routes;


