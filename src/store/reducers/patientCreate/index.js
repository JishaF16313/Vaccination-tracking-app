import * as actions from '../../actions/patientCreate/index';
const initialState = {
    patientDataforCreate:null
}

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.ADD_PATIENT:
            return { ...state, patientDataforCreate: payload }
        default:
            return state
    }
}

export default Reducer;