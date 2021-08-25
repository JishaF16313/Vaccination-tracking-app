import * as actions from '../../actions/schedulevaccination/index';

const initialState = {
    availableVaccineList: null,
    scheduledVaccinationData: null,
    openeVaccinationConfirmPopup: false
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.GET_AVAILABLE_VACCINE_BY_DATE:
            return { ...state, availableVaccineList: payload };
        case actions.TYPES.SCHEDULE_VACCINATION:
            return { ...state, scheduledVaccinationData: payload };
        case actions.TYPES.OPEN_SCHEDULE_VACCINATION_SUCCESS_POPUP:
            return { ...state, openeVaccinationConfirmPopup: payload };
        default:
            return state;
    }
}

export default Reducer;
