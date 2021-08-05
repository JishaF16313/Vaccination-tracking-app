import * as actions from '../../actions/hospitalusers/index';

const initialState = {
    userList: [{ id: 1, name: 'User 1', userName: 'Username 1', address: 'Address 1', hospitalName: 'Hospital 1', userType: 'General' },
    { id: 2, name: 'User 2', userName: 'Username 2', address: 'Address 2', hospitalName: 'Hospital 2', userType: 'Platform Admin' }],
    addOrUpdate: 'add'
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.GET_USER_LIST:
            return state;
        case actions.TYPES.ADD_UPDATE:
            return { ...state, addOrUpdate: payload };
        case actions.TYPES.ADD_USER:
            return { ...state, userList: [...state.userList, payload] };
        default:
            return state;
    }
}

export default Reducer;

