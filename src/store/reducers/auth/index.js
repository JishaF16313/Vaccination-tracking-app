import {
    AUTH_INIT,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGOUT
} from "../../actions/auth"

const initialState = {
    username: null,
    role: null, 
    cityName: null,
    hospitalId: null,
    pinCode: null,
    hospitalBranchId: null,
    isAuthenticated: false,
    isAuthenticating: false,
    token: null
};

const Reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // Authentication
        case AUTH_INIT:
            return {...state, isAuthenticating: true}
        case AUTH_SUCCESS:
            localStorage.setItem("user", JSON.stringify(payload))
            return { ...state, isAuthenticating: false, isAuthenticated: true, username: payload.sub, role: payload.role[0].authority, cityName: payload.cityName, hospitalId: payload.hospitalId, pinCode: payload.pinCode, hospitalBranchId: payload.hospitalBranchId, token: payload.jwt}
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

