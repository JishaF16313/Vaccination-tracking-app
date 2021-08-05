import {
    AUTH_INIT,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGOUT
} from "../../actions/users"

const initialState = {
    name: null,
    email: null,
    username: null,
    role: null,
    isAuthenticated: false,
    isAuthenticating: false
};

const Reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // Authentication
        case AUTH_INIT:
            return {...state, isAuthenticating: true}
        case AUTH_SUCCESS:
            localStorage.setItem("user", JSON.stringify(payload))
            return { ...state, isAuthenticating: false, isAuthenticated: true, name: payload.name, email: payload.email, username: payload.username, role: payload.role}
        case AUTH_FAIL:{
            return {...state, isAuthenticating: false, authError: payload}
        }
        case LOGOUT:{
            localStorage.clear("user")
            return {...initialState}
        }

        default:
            return state;
    }
}

export default Reducer;

