export const TYPES = {
    GET_USER_LIST: 'GET_USER_LIST',
    ADD_UPDATE: 'ADD_UPDATE',
    ADD_USER: 'ADD_USER',
    SET_EDITED_HOSPITAL_USER_DATA: 'SET_EDITED_HOSPITAL_USER_DATA',
    UPDATE_HOSPITAL_USER: 'UPDATE_HOSPITAL_USER'
 }
 
 export const getUserList = () => ({
    type: TYPES.GET_USER_LIST
 });
 
 export const setAddOrUpdate = (value) => ({ 
    type: TYPES.ADD_UPDATE , payload: value
 });
 
 export const addHospitalUser = (value) => ({ 
    type: TYPES.ADD_USER , payload: value
 });
 
 export const setEditedHospitalUserData = (value) => ({
   type: TYPES.SET_EDITED_HOSPITAL_USER_DATA , payload: value
});

export const updateHospitalUser = (value) => ({ 
   type: TYPES.UPDATE_HOSPITAL_USER , payload: value
});

 