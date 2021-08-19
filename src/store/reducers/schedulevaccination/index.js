import * as actions from '../../actions/schedulevaccination/index';

const initialState = {
    availableVaccineList: null,
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.GET_AVAILABLE_VACCINE_BY_DATE:
            return { ...state, availableVaccineList: payload };
        default:
            return state;
    }
}

export default Reducer;
