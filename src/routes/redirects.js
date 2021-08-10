import React from "react"
import {Redirect} from "react-router-dom"
import {useSelector} from "react-redux"
import Role from "../lib/roles";

const Redirects = () => {
    const {role} = useSelector(store => store.auth)
    let redirectUrl = ""
    switch(role){
        case Role.Admin:
            redirectUrl = "/admindashboard"
            break
        case Role.HoAdmin:
            redirectUrl = "/hospitaladmin"
            break
        case Role.VcAdmin:
            redirectUrl = "/vaccination"
            break
        case Role.User:
            redirectUrl = "/userdashboard"
            break
    }
    return <Redirect from="/redirect" to={redirectUrl}/>
}

export default Redirects

