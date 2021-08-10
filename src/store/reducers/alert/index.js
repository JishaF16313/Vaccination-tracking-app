import * as actions from '../../actions/alert/index';

const initialState = {
    alertType: null,
    alertTitle: null,
    alertMessage: null
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.SHOW_ALERT:
            return { ...state, alertType: payload.alertType , alertTitle: payload.alertTitle, alertMessage: payload.alertMessage };
        case actions.TYPES.HIDE_ALERT:
            return { ...state, alertType: null , alertTitle: null, alertMessage: null };
        default:
            return state;
    }
}

export default Reducer;
