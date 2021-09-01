import * as actions from '../../actions/hospitalbranch/index';

const initialState = {
    branchList: null,
    addOrUpdate: 'add',
    editedHospitalBranchData: null,
    hospitalBranchDdlOptions: null
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.TYPES.GET_HOSPITAL_BRANCH_LIST:
            return { ...state, branchList: payload };
        case actions.TYPES.SET_HOSPITAL_BRANCH_DDL_OPTIONS:
            return { ...state, hospitalBranchDdlOptions: payload };
        case actions.TYPES.ADD_UPDATE:
            return { ...state, addOrUpdate: payload };
        case actions.TYPES.ADD_BRANCH:
            return { ...state, branchList: payload };
        case actions.TYPES.SET_EDITED_HOSPITAL_BRANCH_DATA:
            return { ...state, editedHospitalBranchData: payload };
        case actions.TYPES.UPDATE_HOSPITAL_BRANCH:
            let updatedList = [...state.branchList];
            const updateIndex = updatedList.findIndex(detail => detail.id == state.editedHospitalBranchData.id);
            updatedList[updateIndex] = { ...payload };
            return { ...state, userList: updatedList };
        default:
            return state;
    }
}

export default Reducer;
