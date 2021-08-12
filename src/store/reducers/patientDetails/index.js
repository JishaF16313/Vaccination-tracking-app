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
        default:
            return state
    }
}

export default Reducer;