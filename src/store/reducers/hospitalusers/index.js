import * as actions from '../../actions/hospitalusers/index';
import { removeObjectFromArray } from '../../../utility/commonFunctions';

const initialState = {
    userList: [{ id: 1, name: 'User 1', userName: 'Username 1', address: 'Address 1', hospitalName: 'Hospital 1', userType: 'General' },
    { id: 2, name: 'User 2', userName: 'Username 2', address: 'Address 2', hospitalName: 'Hospital 2', userType: 'Platform Admin' }],
    addOrUpdate: 'add',
    addedHospitalUserId: null,
    editedHospitalUserData: null,
    deletingHospitalUserId: null,
    openDeleteConfirmationDialog: false
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.GET_USER_LIST:
            return state;
        case actions.TYPES.ADD_UPDATE:
            return { ...state, addOrUpdate: payload };
        case actions.TYPES.ADD_USER:
            return { ...state, addedHospitalUserId: payload };
        case actions.TYPES.SET_EDITED_HOSPITAL_USER_DATA:
            return { ...state, editedHospitalUserData: payload };
        case actions.TYPES.UPDATE_HOSPITAL_USER:
            let updatedList = [...state.userList];
            const updateIndex = updatedList.findIndex(detail => detail.id === state.editedHospitalUserData.id);
            updatedList[updateIndex] = { ...payload };
            return { ...state, userList: updatedList }
        case actions.TYPES.SET_DELETING_HOSPITAL_USER_ID:
            return { ...state, deletingHospitalUserId: payload };
        case actions.TYPES.OPEN_HOSPITAL_USER_DELETE_DIALOG:
            return { ...state, openDeleteConfirmationDialog: payload };
        case actions.TYPES.DELETE_SELECTED_HOSPITAL_USER:
            let updatedArr = removeObjectFromArray(state.userList, 'id', state.deletingHospitalUserId);
            return { ...state, userList: updatedArr };
        default:
            return state;
    }
}

export default Reducer;

