import users from "../../../lib/mocks/users.json"
import * as API from "../../../lib/api"
import {parseJwt} from "../../../utility/commonFunctions"
import history from "../../../routes/history"

// Authentication
export const AUTH_INIT = "AUTH_INIT"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAIL = "AUTH_FAIL"
export const LOGOUT = "LOGOUT"

export const checkAuth = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) dispatch(authSuccess(user))
    else dispatch({type: LOGOUT})
}

export const authenticate =  (credentials) => async(dispatch) => {   
    dispatch(authInit())
    if(users.findIndex(user => user.sub === credentials.userLoginId) >= 0)
    {
    return setTimeout(() =>{
        const user = users.find(user => user.sub === credentials.userLoginId)
        user ? dispatch(authSuccess(user)) : dispatch(authFail("Invalid credentials"))
    }, 500)
    }
    try{    
    const token = await API.API_PUT_SERVICE("http://9.43.89.156:8081/user/_login",credentials)
    const user = parseJwt(token)    
    dispatch(authSuccess({...user, token: token }))
    }
    catch(error)
    {
        dispatch(authFail(error.message || "Something failed !"))
    }
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

export const logout = (token) => async(dispatch) => {
    dispatch({type: LOGOUT})
    history.push("/")
    try{
        await API.API_PUT_SERVICE("http://9.43.89.156:8081/user/_logout",{},{headers: { "X-Token-ID": token}})
    }
    catch(error)
    {
        console.log(error);
    }
}

