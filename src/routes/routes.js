import {useSelector} from "react-redux"
import Role from "../lib/roles";

import UnprotectedRoutes from "./UnprotectedRoutes";
import HospitalAdminRoutes from "./HospitalAdminRoutes";
import VaccinationAdminRoutes from "./VaccinationAdminRoutes";
import UserRoutes from "./UserRoutes"
import AppAdminRoutes from "./AppAdminRoutes";

function Routes() {
  const {role, isAuthenticated} = useSelector(store => store.auth)

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
}

export default Routes;


