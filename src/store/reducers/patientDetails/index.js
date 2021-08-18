import SETPATIENTDETAILS from '../../actions/patientDetails/index';
import * as actions from '../../actions/patientDetails/index';

const initialState = {
    hospitalAvailableBedList: null,
    bookingData: null
}

const Reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case actions.TYPES.SETPATIENTDETAILS:
            return {...state, hospitalAvailableBedList: payload}
        case actions.TYPES.SET_HOSPITAL_AVAIALBLE_BED_LIST:
                return { ...state, hospitalAvailableBedList: payload };
        case actions.TYPES.SET_PATIENT_BED_BOOKING_DETAILS:
             return{...state, bookingData: payload}
        default:
            return state
    }
}

export default Reducer;