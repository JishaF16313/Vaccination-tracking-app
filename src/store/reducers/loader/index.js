import * as actions from '../../actions/loader/index';

const initialState = {
    showLoader: false,
    message: null
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.SHOW_LOADER:
            return { ...state, showLoader: true, message: payload };
        case actions.TYPES.HIDE_LOADER:
            return { ...state, showLoader: false };
        default:
            return state;
    }
}

export default Reducer;
