import * as actions from '../../actions/patientDetails/index';

const initialState = {
    hospitalAvailableBedList: null,
    bookingData: null,
    bookintStatus: null,
    confirmStatus: null,
    bookingDetails: null,
    openModal: false,
    modalData: null
}

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.SETPATIENTDETAILS:
            return { ...state, hospitalAvailableBedList: payload }
        case actions.TYPES.SET_HOSPITAL_AVAIALBLE_BED_LIST:
            return { ...state, hospitalAvailableBedList: payload };
        case actions.TYPES.SET_PATIENT_BED_BOOKING_DETAILS:
            return { ...state, bookingData: payload }
        case actions.TYPES.GET_BOOKING_STATUS:
            return { ...state, bookintStatus: payload }
        case actions.TYPES.CONFIRM_BED_BOOKING:
            return { ...state, confirmStatus: payload }
        case actions.TYPES.GET_BOOKING_DETAILS:
            return { ...state, bookingDetails: payload }
        case actions.TYPES.OPEN_MODAL:
            return { ...state, openModal: payload };
        default:
            return state
    }
}

export default Reducer;
