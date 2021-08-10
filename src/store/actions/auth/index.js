import users from "../../../lib/mocks/users.json"
import * as API from "../../../lib/api"
import {parseJwt} from "../../../utility/commonFunctions"

// Authentication
export const AUTH_INIT = "AUTH_INIT"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAIL = "AUTH_FAIL"
export const LOGOUT = "LOGOUT"

export const checkAuth = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log("checking auth", user);
    if(user) dispatch(authSuccess(user))
    else dispatch(logout())
}

export const authenticate = (credentials) => dispatch => {
    dispatch(authInit())
    if(users.findIndex(user => user.email === credentials.userLoginId) >= 0)
    {
    return setTimeout(() =>{
        const user = users.find(user => user.email === credentials.userLoginId)
        user ? dispatch(authSuccess(user)) : dispatch(authFail("Invalid credentials"))
    }, 500)
    }
    API.API_PUT_SERVICE("/auth/login",credentials).then( token => {
        const user = parseJwt(token)
        dispatch(authSuccess({...user, jwt: token}))
    })
}
const authInit = () => ({
    type: AUTH_INIT
})
const authSuccess = (response) => ({
    type: AUTH_SUCCESS,
    payload: response
})
const authFail = (response) => ({
    type: AUTH_FAIL,
    payload: response
})

export const logout = () => dispatch => {
    return new Promise( (resolve) => {
        setTimeout(() => {
            dispatch({type: LOGOUT})
            resolve("success")
        })
    })
}

