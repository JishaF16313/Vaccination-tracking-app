export const TYPES = {
   GET_HOSPITAL_LIST: 'GET_HOSPITAL_LIST',
   ADD_UPDATE: 'ADD_UPDATE',
   ADD_HOSPITAL: 'ADD_HOSPITAL',
   SET_EDITED_HOSPITAL_DATA: 'SET_EDITED_HOSPITAL_DATA',
   UPDATE_HOSPITAL: 'UPDATE_HOSPITAL'
}

export const getHospitalList = () => ({
   type: TYPES.GET_HOSPITAL_LIST
});

export const setAddOrUpdate = (value) => ({ 
   type: TYPES.ADD_UPDATE , payload: value
});

export const addHospital = (value) => ({ 
   type: TYPES.ADD_HOSPITAL , payload: value
});

export const setEditedHospitalData = (value) => ({
   type: TYPES.SET_EDITED_HOSPITAL_DATA , payload: value
});

export const updateHospital = (value) => ({ 
   type: TYPES.UPDATE_HOSPITAL , payload: value
});
