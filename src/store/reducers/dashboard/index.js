import * as actions from '../../actions/dashboard/index';

const initialState = {
    getAllReportData: null
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.GET_ALL_REPORT:
            return { ...state, getAllReportData : payload }
        default:
            return state;
    }
}

export default Reducer;
