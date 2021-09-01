import {
    USER_REGISTER_INIT,
    USER_REGISTER_FAIL    
} from "../../actions/users/"

const initialState = {
    isRegister: false,   
};

const Reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // Authentication
        case USER_REGISTER_INIT:
            return {...state, isRegister: payload}        
        case USER_REGISTER_FAIL:
            return {...state, isRegisterFail: payload}       
        default:
            return state;
    }
}

export default Reducer;

