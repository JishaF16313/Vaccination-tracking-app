import users from "../../../lib/mocks/users.json"

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
    setTimeout(() =>{
        const user = users.find(user => user.email === credentials.userName)
        user ? dispatch(authSuccess(user)) : dispatch(authFail("Invalid credentials"))
    }, 500)
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

export const logout = () => ({
    type: LOGOUT
})