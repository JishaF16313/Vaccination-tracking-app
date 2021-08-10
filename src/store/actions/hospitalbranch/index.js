export const TYPES = {
    GET_HOSPITAL_BRANCH_LIST: 'GET_HOSPITAL_BRANCH_LIST',
    ADD_UPDATE: 'ADD_UPDATE',
    ADD_BRANCH: 'ADD_BRANCH',
    SET_EDITED_HOSPITAL_BRANCH_DATA: 'SET_EDITED_HOSPITAL_BRANCH_DATA',
    UPDATE_HOSPITAL_BRANCH: 'UPDATE_HOSPITAL_BRANCH'
 }
 
 export const getHospitalBranchList = () => ({
    type: TYPES.GET_HOSPITAL_BRANCH_LIST
 });
 
 export const setAddOrUpdate = (value) => ({ 
    type: TYPES.ADD_UPDATE , payload: value
 });
 
 export const addHospitalBranch = (value) => ({ 
    type: TYPES.ADD_BRANCH , payload: value
 });
 
 export const setEditedHospitalBranchData = (value) => ({
   type: TYPES.SET_EDITED_HOSPITAL_BRANCH_DATA , payload: value
});

export const updateHospitalBranch = (value) => ({ 
   type: TYPES.UPDATE_HOSPITAL_BRANCH , payload: value
});
