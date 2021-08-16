import SETPATIENTDETAILS from '../../actions/patientDetails/index';
import * as actions from '../../actions/patientDetails/index';

const initialState = {
    hospitalAvailableBedList: [],
    loading: false,
    error: null
}

const Reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case actions.TYPES.SETPATIENTDETAILS:
            return {...state, hospitalAvailableBedList: payload, loading: false}
        case actions.TYPES.SET_HOSPITAL_AVAIALBLE_BED_LIST:
                return { ...state, hospitalAvailableBedList: payload };
        default:
            return state
    }
}

export default Reducer;